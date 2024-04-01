from app.models import db, Product, AddToCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_add_to_cart():
    add_to_cart_data = [
        {"cart_id": 2, "product_id": 5, "quantity_added": 2},
        {"cart_id": 2, "product_id": 8, "quantity_added": 3},
        {"cart_id": 3, "product_id": 10, "quantity_added": 1},
        {"cart_id": 3, "product_id": 12, "quantity_added": 2},
        {"cart_id": 4, "product_id": 15, "quantity_added": 1},
        {"cart_id": 4, "product_id": 18, "quantity_added": 4},
        {"cart_id": 5, "product_id": 20, "quantity_added": 2},
        {"cart_id": 5, "product_id": 3, "quantity_added": 3},
        {"cart_id": 6, "product_id": 6, "quantity_added": 1},
        {"cart_id": 6, "product_id": 9, "quantity_added": 2},
        {"cart_id": 7, "product_id": 11, "quantity_added": 3},
        {"cart_id": 7, "product_id": 14, "quantity_added": 1},
        {"cart_id": 8, "product_id": 16, "quantity_added": 2},
        {"cart_id": 8, "product_id": 19, "quantity_added": 3},
        {"cart_id": 9, "product_id": 1, "quantity_added": 1},
        {"cart_id": 9, "product_id": 4, "quantity_added": 4},
        {"cart_id": 10, "product_id": 7, "quantity_added": 2},
        {"cart_id": 10, "product_id": 13, "quantity_added": 3},
        {"cart_id": 2, "product_id": 17, "quantity_added": 1},
        {"cart_id": 3, "product_id": 2, "quantity_added": 2}
    ]

    for data in add_to_cart_data:
        product = Product.query.get(data["product_id"])
        if product:
            subtotal = product.price * data["quantity_added"]
            add_to_cart = AddToCart(
                cart_id=data["cart_id"],
                product_id=data["product_id"],
                quantity_added=data["quantity_added"],
                subtotal=subtotal
            )
            db.session.add(add_to_cart)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_add_to_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.add_to_cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM add_to_cart"))

    db.session.commit()
