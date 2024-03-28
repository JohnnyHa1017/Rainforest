from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .aws_helpers import upload_file_to_s3, get_unique_filename
from app.models import db, Cart, Product, Review
from app.forms import CartForm, ProductForm, ReviewForm

product_routes = Blueprint('product', __name__)


# Get all Products
@product_routes.route('/')
def get_all_products():
    products = Product.query.all()

    return jsonify({'products': [product.to_dict() for product in products]}), 200


# Get Specific Product
@product_routes.route('/<int:id>')
def get_one_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({'error': 'Product was not found'}), 404

    return product.to_dict(), 200


# Create Product Listing
@product_routes.route('/', methods=['POST'])
@login_required
def create_listing():
    form = ProductForm(request.form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data['image']
        url = None
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({'error': 'Not a valid image, upload failed'}), 400

            url = upload['url']

        product_listing = Product(
            user_id=current_user.id,
            name=form.name.data,
            price=form.price.data,
            category=form.category.data,
            quantity_available=form.quantity_available.data,
            image=url,
            body=form.body.data
        )

        db.session.add(product_listing)
        db.session.commit()

        return jsonify({'product': product_listing.to_dict()}), 201
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400

# Updating a Product - Not Part of CRUD
# Deleting a Product - Not Part of CRUD

## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##


# Get all Reviews on a Product
@product_routes.route('/<int:id>/reviews')
def all_reviews_on_id(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    reviews = Review.query.filter_by(product_id=id).all()
    reviews_data = [review.to_dict() for review in reviews]

    return jsonify({'reviews': reviews_data}), 200


# Creating a Review for a Product
@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data['image_url']
        url = None

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if 'url' not in upload:
                return jsonify({'error': 'Image upload failed.'}), 500
            url = upload['url']

        new_review = Review(
            user_id=current_user.id,
            product_id=id,
            rating=form.rating.data,
            verified_purchase=form.verified_purchase.data,
            image=url,
            body=form.body.data
        )

        db.session.add(new_review)
        db.session.commit()

        return jsonify({'review': new_review.to_dict()}), 201
    else:
        errors = form.errors
        return jsonify({'errors': errors}), 400


## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##


# Get Cart for Current User or Create a New Cart
    # !: Needs to Test Still
@product_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_cart_for_user():
    form = CartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if request.method == 'GET':
        if not cart:
            return jsonify({'message': 'Cart not found for the current user.'}), 404
        else:
            return jsonify({'cart': cart.to_dict()}), 200

    elif request.method == 'POST':
        if not cart:
            new_cart = Cart(user_id=current_user.id)
            db.session.add(new_cart)
            db.session.commit()
            return jsonify({'message': 'New cart created for the current user.'}), 201
        else:
            # TODO: Add logic for updating the cart
            # ?: Is this logic even to be implemented here? Maybe in Update Route rather?
            # TODO: Update the existing cart or add items to it
            return jsonify({'message': 'Cart updated for the current user.'}), 200
