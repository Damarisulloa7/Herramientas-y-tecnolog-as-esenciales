from flask import Flask, render_template

app = Flask(__name__)

# ===== DATOS DE EJEMPLO (para demostrar dinamismo) =====
# Variable simple
nombre_sitio = "Aura Glow Cosmetics"

# Lista de productos con stock y disponibilidad
productos = [
    {"id": 1, "nombre": "Base Líquida Matte", "categoria": "Maquillaje", "precio": 25.00, "stock": 15},
    {"id": 2, "nombre": "Paleta de Sombras Nude", "categoria": "Sombras", "precio": 35.00, "stock": 8},
    {"id": 3, "nombre": "Labial Líquido Rojo", "categoria": "Labiales", "precio": 18.00, "stock": 0},
    {"id": 4, "nombre": "Serum Facial Revitalizante", "categoria": "Cuidado Facial", "precio": 40.00, "stock": 5},
    {"id": 5, "nombre": "Corrector Líquido", "categoria": "Maquillaje", "precio": 12.00, "stock": 0},
    {"id": 6, "nombre": "Mascarilla Hidratante", "categoria": "Cuidado Facial", "precio": 22.00, "stock": 10},
]

# Lista de clientes
clientes = [
    {"nombre": "María González", "email": "maria@email.com", "telefono": "0998123456", "ciudad": "Quito"},
    {"nombre": "Carlos Pérez", "email": "carlos@email.com", "telefono": "0998765432", "ciudad": "Guayaquil"},
    {"nombre": "Ana Rodríguez", "email": "ana@email.com", "telefono": "0998112233", "ciudad": "Cuenca"},
    {"nombre": "Luis Méndez", "email": "luis@email.com", "telefono": "0998556677", "ciudad": "Quito"},
]

# Lista de proveedores
proveedores = [
    {"nombre": "Distribuidora Beauty S.A.", "contacto": "Juan López", "telefono": "022345678", "pais": "Ecuador"},
    {"nombre": "Cosméticos Naturales Cía.", "contacto": "Elena Castro", "telefono": "022987654", "pais": "Colombia"},
    {"nombre": "Importaciones Glow", "contacto": "Roberto Sánchez", "telefono": "022456789", "pais": "México"},
]

# Lista de facturas
facturas = [
    {"id": "FAC-001", "cliente": "María González", "fecha": "2026-08-20", "total": 85.00, "estado": "Pagado"},
    {"id": "FAC-002", "cliente": "Carlos Pérez", "fecha": "2026-08-21", "total": 120.00, "estado": "Pendiente"},
    {"id": "FAC-003", "cliente": "Ana Rodríguez", "fecha": "2026-08-22", "total": 45.00, "estado": "Pagado"},
]

# ===== RUTAS =====
@app.route('/')
def index():
    return render_template('index.html', nombre_sitio=nombre_sitio)

@app.route('/productos')
def productos():
    return render_template('productos.html', productos=productos)

@app.route('/clientes')
def clientes():
    return render_template('clientes.html', clientes=clientes)

@app.route('/proveedores')
def proveedores():
    return render_template('proveedores.html', proveedores=proveedores)

@app.route('/facturacion')
def facturacion():
    return render_template('facturacion.html', facturas=facturas)

if __name__ == '__main__':
    app.run(debug=True)
    
    