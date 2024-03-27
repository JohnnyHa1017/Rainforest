from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, TextAreaField
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, NumberRange, Length, Optional

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100)])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    category = StringField('Category', validators=[Optional(), Length(max=50)])
    quantity_available = IntegerField('Quantity Available', validators=[DataRequired(), NumberRange(min=0)])
    image_url = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    body = TextAreaField('Description', validators=[Optional(), Length(max=500)])
