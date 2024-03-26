from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  rating = Column(Integer, nullable=False)
  verified_purchase = Column(Boolean, nullable=False)
  image = Column(String)
  body = Column(Text)
  created_at = Column(db.DateTime, default=datetime.utcnow)
  updated_at = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  user = relationship('User', back_populates='reviews')
  product = relationship('Product', back_populates='reviews', cascade='all, delete-orphan')

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'product_id': self.product_id,
          'rating': self.rating,
          'verified_purchase': self.verified_purchase,
          'image': self.image,
          'body': self.body,
          'created_at': self.created_at,
          'updated_at': self.updated_at
      }
