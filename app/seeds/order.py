from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order1 = Order(cart_id=1, user_id=1, status=Order.status.PENDING)
    order2 = Order(cart_id=2, user_id=2, status=Order.status.SHIPPED)
    order3 = Order(cart_id=3, user_id=3, status=Order.status.DELIVERED)
    order4 = Order(cart_id=4, user_id=4, status=Order.status.PENDING)
    order5 = Order(cart_id=5, user_id=5, status=Order.status.SHIPPED)
    order6 = Order(cart_id=6, user_id=6, status=Order.status.DELIVERED)
    order7 = Order(cart_id=7, user_id=7, status=Order.status.PENDING)
    order8 = Order(cart_id=8, user_id=8, status=Order.status.SHIPPED)
    order9 = Order(cart_id=9, user_id=9, status=Order.status.DELIVERED)
    order10 = Order(cart_id=10, user_id=10, status=Order.status.PENDING)
    order11 = Order(cart_id=11, user_id=1, status=Order.status.SHIPPED)
    order12 = Order(cart_id=12, user_id=2, status=Order.status.DELIVERED)
    order13 = Order(cart_id=13, user_id=3, status=Order.status.PENDING)
    order14 = Order(cart_id=14, user_id=4, status=Order.status.SHIPPED)
    order15 = Order(cart_id=15, user_id=5, status=Order.status.DELIVERED)
    order16 = Order(cart_id=16, user_id=6, status=Order.status.PENDING)
    order17 = Order(cart_id=17, user_id=7, status=Order.status.SHIPPED)
    order18 = Order(cart_id=18, user_id=8, status=Order.status.DELIVERED)
    order19 = Order(cart_id=19, user_id=9, status=Order.status.PENDING)
    order20 = Order(cart_id=20, user_id=10, status=Order.status.SHIPPED)

    db.session.add_all([
        order1, order2, order3, order4, order5,
        order6, order7, order8, order9, order10,
        order11, order12, order13, order14, order15,
        order16, order17, order18, order19, order20
    ])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
