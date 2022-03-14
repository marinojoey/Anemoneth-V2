from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length


class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(min=3, max=30, message='Title must be 3-30 characters.')])
    caption = TextAreaField('caption', validators=[DataRequired()])
