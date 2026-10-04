from flask_wtf import FlaskForm
from wtforms import SelectField, DateField, DecimalField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class FacturacionForm(FlaskForm):
    id_cliente = SelectField('Cliente', coerce=int, validators=[DataRequired(message='Debes seleccionar un cliente.')])
    fecha = DateField('Fecha', validators=[DataRequired(message='La fecha es obligatoria.')])
    total = DecimalField('Total', validators=[
        DataRequired(message='El total es obligatorio.'),
        NumberRange(min=0.01, message='El total debe ser mayor a 0.')
    ])
    submit = SubmitField('Guardar Factura')