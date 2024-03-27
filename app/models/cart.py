from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  createdAt = Column(db.DateTime, default=datetime.utcnow)
  updatedAt = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  users = relationship('User', back_populates='carts')
  orders = relationship('Order', back_populates='carts', cascade='all, delete-orphan')
  add_to_cart = relationship('AddToCart', back_populates='carts', cascade='all, delete-orphan')

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'created_at': self.created_at,
          'updated_at': self.updated_at
      }
