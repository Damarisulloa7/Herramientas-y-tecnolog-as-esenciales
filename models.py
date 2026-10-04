from flask_login import UserMixin


class Usuario(UserMixin):
    """
    Clase que representa a un usuario autenticado.
    Hereda de UserMixin, que proporciona propiedades como:
    - is_authenticated
    - is_active
    - is_anonymous
    - get_id()
    """
    def __init__(self, id, usuario, password):
        self.id = id
        self.usuario = usuario
        self.password = password

    def get_id(self):
        """Flask-Login necesita este método para identificar al usuario."""
        return str(self.id)