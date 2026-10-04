import os
import psycopg2
from psycopg2.extras import RealDictCursor


def obtener_conexion():
    """
    Obtiene una conexión a PostgreSQL.
    
    - En LOCAL: usa los valores por defecto.
    - En RENDER: usa la variable de entorno DATABASE_URL.
    
    Retorna una conexión con cursor tipo diccionario, lo que permite
    acceder a los campos por nombre (ej: fila['nombre']) en lugar de por índice.
    """
    # 1) Intentar leer la variable de entorno (Render la crea automáticamente)
    database_url = os.environ.get('DATABASE_URL')
    
    # 2) Si no existe (desarrollo local), usar valores por defecto
    if not database_url:
        database_url = "postgresql://postgres:postgres@localhost:5432/auraglow"
    
    # 3) Render usa "postgres://" pero psycopg2 exige "postgresql://"
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    
    # 4) Crear y devolver la conexión
    conn = psycopg2.connect(database_url, cursor_factory=RealDictCursor)
    return conn