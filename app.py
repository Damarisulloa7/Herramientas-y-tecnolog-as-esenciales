from flask import Flask, render_template

app = Flask(__name__)

# Ruta principal - Página de inicio
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para Productos
@app.route('/productos')
def productos():
    # Datos de ejemplo (puedes cambiarlos)
    lista_productos = [
        {'nombre': 'Base Líquida Matte', 'categoria': 'Maquillaje', 'precio': '$25.00'},
        {'nombre': 'Paleta de Sombras Nude', 'categoria': 'Sombras', 'precio': '$35.00'},
        {'nombre': 'Labial Líquido Rojo', 'categoria': 'Labiales', 'precio': '$18.00'},
        {'nombre': 'Serum Facial Revitalizante', 'categoria': 'Cuidado Facial', 'precio': '$40.00'},
    ]
    return render_template('productos.html', productos=lista_productos)

# Ruta para Clientes
@app.route('/clientes')
def clientes():
    clientes = [
        {'nombre': 'María González', 'email': 'maria@email.com', 'telefono': '0998123456'},
        {'nombre': 'Carlos Pérez', 'email': 'carlos@email.com', 'telefono': '0998765432'},
        {'nombre': 'Ana Rodríguez', 'email': 'ana@email.com', 'telefono': '0998112233'},
    ]
    return render_template('clientes.html', clientes=clientes)

# Ruta para Proveedores
@app.route('/proveedores')
def proveedores():
    proveedores = [
        {'nombre': 'Distribuidora Beauty S.A.', 'contacto': 'Juan López', 'telefono': '022345678'},
        {'nombre': 'Cosméticos Naturales Cía.', 'contacto': 'Elena Castro', 'telefono': '022987654'},
    ]
    return render_template('proveedores.html', proveedores=proveedores)

# Ruta para Facturación
@app.route('/facturacion')
def facturacion():
    facturas = [
        {'id': 'FAC-001', 'cliente': 'María González', 'fecha': '2026-08-20', 'total': '$85.00'},
        {'id': 'FAC-002', 'cliente': 'Carlos Pérez', 'fecha': '2026-08-21', 'total': '$120.00'},
        {'id': 'FAC-003', 'cliente': 'Ana Rodríguez', 'fecha': '2026-08-22', 'total': '$45.00'},
    ]
    return render_template('facturacion.html', facturas=facturas)

if __name__ == '__main__':
    app.run(debug=True)
    