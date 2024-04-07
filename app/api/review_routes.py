from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .aws_helpers import upload_file_to_s3, get_unique_filename
from app.models import db, Review
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)


# Get One Review by Review ID
@review_routes.route('/<int:id>')
@login_required
def get_one_review(id):
    review = Review.query.get(id)

    if not review:
        return jsonify({'error': 'Review was not found.'}), 404

    return review.to_dict(), 200


# Update Review Owned by Current User
@review_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_one_review(id):
    review = Review.query.get(id)

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not review:
        return jsonify({'error': 'Review was not found.'}), 404

    if review.user_id != current_user.id:
        return jsonify({'error': 'You are not authorized to edit this review.'}), 403

    if form.validate_on_submit():
        if 'image_url' in request.files:
            upload_request = request.files['image_url']
            upload_request.filename = get_unique_filename(upload_request.filename)
            upload = upload_file_to_s3(upload_request)

            if 'url' not in upload:
                return jsonify({'error': 'Image upload failed.'}), 500
            review.image = upload['url']

        review.rating = form.rating.data
        review.body = form.body.data

        db.session.commit()
        return jsonify({"message": 'Review updated successfully.'}), 200
    else:
        return jsonify({'errors': form.errors}), 400


# Delete a Review owned by Current User
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if not review:
        return jsonify({'error': 'Review was not found.'}), 404

    if review.user_id != current_user.id:
        return jsonify({'error': 'You are not authorized to delete this review.'}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Successfully deleted review.'}), 200
