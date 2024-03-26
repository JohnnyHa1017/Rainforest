from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum

class OrderStatus(Enum):
  PENDING = 'pending'
  SHIPPED = 'shipped'
  DELIVERED = 'delivered'

class Order(db.Model):
  __tablename__ = 'orders'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  order_id = Column(Integer, primary_key=True)
  cart_id = Column(Integer, ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  status = Column(Enum(OrderStatus), nullable=False)
  created_at = Column(db.DateTime, default=datetime.utcnow)
  updated_at = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  cart = relationship('Cart', back_populates='order', cascade='all, delete-orphan')
  user = relationship('User', back_populates='orders')

  def to_dict(self):
      return {
          'order_id': self.order_id,
          'cart_id': self.cart_id,
          'user_id': self.user_id,
          'status': self.status.value,
          'created_at': self.created_at,
          'updated_at': self.updated_at
      }


