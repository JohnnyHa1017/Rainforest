from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey
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
  createdAt = Column(db.DateTime, default=datetime.utcnow)
  updatedAt = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  carts = relationship('Cart', back_populates='add_to_cart')
  products = relationship('Product', back_populates='add_to_cart')

  def to_dict(self):
      return {
          'id': self.id,
          'cart_id': self.cart_id,
          'product_id': self.product_id,
          'quantity_added': self.quantity_added,
          'createdAt': self.createdAt,
          'updatedAt': self.updatedAt
      }

