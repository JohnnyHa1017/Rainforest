from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .aws_helpers import upload_file_to_s3, get_unique_filename
from app.models import db, User, Cart, Product, Review, AddToCart
from app.forms import ProductForm, ReviewForm

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


# Get Products Listed by Current User
@product_routes.route('/manage')
@login_required
def client_owned_products():
    # Query products belonging to the current user
    products = Product.query.filter_by(user_id=current_user.id).all()
    products_data = [product.to_dict() for product in products]

    return jsonify({'products': products_data}), 200


# Create Product Listing
@product_routes.route('/new', methods=['POST'])
@login_required
def create_listing():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data['image_url']
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


# Update a Product Listing
@product_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_listing(id):
    product = Product.query.get(id)

    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not product:
        return jsonify({'error': 'Unable to locate product'}), 404

    if product.user_id != current_user.id:
        return jsonify({'error:' 'You are not authorized to make changes to this product.'}), 403

    if form.validate_on_submit():
        if 'image_url' in request.files:
            # Handle image upload and update product image URL
            upload_request = request.files['image_url']
            upload_request.filename = get_unique_filename(upload_request.filename)
            upload = upload_file_to_s3(upload_request)

            if 'url' not in upload:
                return jsonify({'error': 'Image upload failed.'}), 500
            product.image = upload['url']

        # Update product details
        product.name = form.name.data
        product.price = form.price.data
        product.category = form.category.data
        product.quantity_available = form.quantity_available.data
        product.body = form.body.data

        db.session.commit()

        return jsonify({"message": "Product has been updated successfully."}), 200
    else:
        return jsonify({'errors': form.errors}), 400


# Delete a Product Listing
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_listing(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({'error': 'Unable to locate product'}), 404

    if product.user_id != current_user.id:
        return jsonify({'error': 'You are not authorized to delete this product.'}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product listing successfully deleted.'}), 200


# Shop by Categories
@product_routes.route('/categories/<string:category>')
def shopCategories(category):
    categorizedProducts = Product.query.filter(Product.category == category).all()

    if not categorizedProducts:
        return jsonify({'error': 'No products were found with your category.'}), 400

    return jsonify({'products': [product.to_dict() for product in categorizedProducts]}), 200


## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##
## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ## ## BREAK ##


# Get all Reviews on a Product
@product_routes.route('/<int:id>/reviews/all')
def all_reviews_on_id(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    reviews = Review.query.filter_by(product_id=id).all()
    reviews_data = [review.to_dict() for review in reviews]

    return jsonify({'reviews': reviews_data}), 200


# Creating a Review for a Product
@product_routes.route('/<int:id>/reviews/new', methods=['POST'])
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
@product_routes.route('/carts', methods=['GET', 'POST'])
@login_required
def get_or_create_cart():
    if request.method == 'GET':
        cart = Cart.query.filter_by(user_id=current_user.id).first()
        if not cart:
            return jsonify({'message': 'Cart not found for the current user.'}), 404

        # Fetch associated cart items with subtotal
        cart_items = AddToCart.query.filter_by(cart_id=cart.id).all()

        # Serialize cart items and calculate subtotal
        serialized_cart = []
        subtotal = 0.00
        for item in cart_items:
            subtotal += item.subtotal
            serialized_cart.append({
                'id': item.id,
                'cart_id': item.cart_id,
                'product_id': item.product_id,
                'quantity_added': item.quantity_added,
                'subtotal': item.subtotal,
                'created_at': item.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                'updated_at': item.updated_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return jsonify({'cart_items': serialized_cart}), 200

    elif request.method == 'POST':
        cart = Cart.query.filter_by(user_id=current_user.id).first()
        if not cart:
            new_cart = Cart(user_id=current_user.id)
            db.session.add(new_cart)
            db.session.commit()
            return jsonify({'message': 'New cart created for the current user.'}), 201
        return jsonify({'message': 'Cart already exists for the current user.'}), 200


# Get All Carts for Current User (Past, Present)
@product_routes.route('/carts/history')
@login_required
def cart_history():
    # Fetch all carts for the current user
    carts = Cart.query.filter_by(user_id=current_user.id).all()

    if not carts:
        return jsonify({'message': 'No carts found for the current user.'}), 404

    # List to store cart history
    cart_history = []

    for cart in carts:
        # Fetch associated cart items with subtotal
        cart_items = AddToCart.query.filter_by(cart_id=cart.id).all()

        # Serialize cart items and calculate subtotal
        serialized_cart = []
        subtotal = 0.00
        for item in cart_items:
            subtotal += item.subtotal
            serialized_cart.append({
                'id': item.id,
                'cart_id': item.cart_id,
                'product_id': item.product_id,
                'quantity_added': item.quantity_added,
                'subtotal': item.subtotal,
                'created_at': item.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                'updated_at': item.updated_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        # Add cart details to cart history
        cart_history.append(serialized_cart)

    return jsonify({'cart_history': cart_history}), 200


# Adding Products to Cart
@product_routes.route('/cart/add_product', methods=['POST'])
@login_required
def add_product_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not product_id:
        return jsonify({'error': 'Product ID is required.'}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found.'}), 404

    if product.price is None or quantity is None:
        return jsonify({'error': 'Price or quantity is missing or invalid.'}), 400

    cart = Cart.query.filter_by(user_id=current_user.id).first()
    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    subtotal = product.price * quantity

    existing_item = AddToCart.query.filter_by(cart_id=cart.id, product_id=product_id).first()
    if existing_item:
        existing_item.quantity_added += quantity
        existing_item.subtotal += subtotal
    else:
        new_item = AddToCart(cart_id=cart.id, product_id=product_id, quantity_added=quantity, subtotal=subtotal)
        db.session.add(new_item)

    db.session.commit()

    return jsonify({'message': f'Product added to cart successfully.'}), 200


# Updating the Current Users Cart ('Save for Later')
@product_routes.route('/cart/update', methods=['PUT'])
@login_required
def update_cart():
    data = request.get_json()
    cart_items = data.get('cart_items')

    if not cart_items:
        return jsonify({'error': 'Cart items are required.'}), 400

    for cart_item in cart_items:
        cart_id = cart_item.get('cart_id')
        product_id = cart_item.get('product_id')
        quantity = cart_item.get('quantity')

        if not cart_id or not product_id:
            return jsonify({'error': 'Both cart ID and product ID are required.'}), 400

        cart_item_record = AddToCart.query.filter_by(cart_id=cart_id, product_id=product_id).first()
        if not cart_item_record:
            return jsonify({'error': f'Cart item with product ID {product_id} not found.'}), 404

        if quantity is not None:
            if not isinstance(quantity, int) or quantity < 0:
                return jsonify({'error': 'Invalid quantity.'}), 400
            cart_item_record.quantity_added = quantity

            product = Product.query.get(product_id)
            if product:
                cart_item_record.subtotal = quantity * product.price
            else:
                return jsonify({'error': f'Product with ID {product_id} not found.'}), 404

    db.session.commit()
    return jsonify({'message': 'Cart updated successfully.'}), 200



# Deleting Item(s) from the User's Cart
@product_routes.route('/cart/remove/<int:cart_id>', methods=['DELETE'])
@login_required
def remove_from_cart(cart_id):
    cart_item = AddToCart.query.get(cart_id)

    if not cart_item:
        return jsonify({'error': 'Cart item not found.'}), 404

    cart = Cart.query.filter(Cart.id == cart_item.cart_id).first()

    if cart.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized access to cart item.'}), 403

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Cart item deleted successfully.'}), 200
