from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime

class AddToCart(db.Model):
    __tablename__ = 'add_to_cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity_added = Column(Integer, nullable=False)
    subtotal = Column(Float, nullable=False)
    created_at = Column(db.DateTime, default=datetime.utcnow)
    updated_at = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    carts = relationship('Cart', back_populates='add_to_cart')
    products = relationship('Product', back_populates='add_to_cart')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity_added': self.quantity_added,
            'subtotal': self.subtotal,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
