from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductoForm(FlaskForm):
    nombre = StringField('Nombre del Producto', validators=[
        DataRequired(message='El nombre es obligatorio.'),
        Length(min=3, max=100, message='El nombre debe tener entre 3 y 100 caracteres.')
    ])
    descripcion = TextAreaField('Descripción', validators=[
        DataRequired(message='La descripción es obligatoria.'),
        Length(min=10, max=500, message='La descripción debe tener entre 10 y 500 caracteres.')
    ])
    precio = DecimalField('Precio', validators=[
        DataRequired(message='El precio es obligatorio.'),
        NumberRange(min=0.01, message='El precio debe ser mayor a 0.')
    ])
    stock = IntegerField('Stock', validators=[
        DataRequired(message='El stock es obligatorio.'),
        NumberRange(min=0, message='El stock no puede ser negativo.')
    ])
    id_proveedor = SelectField('Proveedor', coerce=int)
    submit = SubmitField('Guardar Producto')