from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class AddToCartForm(FlaskForm):
    cart_id = IntegerField('Cart ID', validators=[DataRequired()])
    product_id = IntegerField('Product ID', validators=[DataRequired()])
    quantity_added = IntegerField('Quantity Added', validators=[DataRequired()])
