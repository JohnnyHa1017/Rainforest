from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from datetime import datetime

class Product(db.Model):
  __tablename__ = 'products'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = Column(Integer, primary_key=True, unique=True)
  user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = Column(String, nullable=False)
  price = Column(Float, nullable=False)
  category = Column(String)
  quantity_available = Column(Integer, nullable=False)
  image = Column(String)
  body = Column(Text)
  created_at = Column(db.DateTime, default=datetime.utcnow)
  updated_at = Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  user = relationship('User', back_populates='products')
  reviews = relationship('Review', back_populates='product', cascade='all, delete-orphan')

  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'name': self.name,
          'price': self.price,
          'category': self.category,
          'quantity_available': self.quantity_available,
          'image': self.image,
          'body': self.body,
          'created_at': self.created_at,
          'updated_at': self.updated_at
      }


