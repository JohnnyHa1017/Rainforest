from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField, TextAreaField
from flask_wtf.file import FileField, FileAllowed
from ..api.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    product_id = IntegerField('Product ID', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    verified_purchase = BooleanField('Verified Purchase')
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    body = TextAreaField('Body', validators=[DataRequired(), Length(max=500)])
