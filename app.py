import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash

# Importar la conexión centralizada
from conexion.conexion import obtener_conexion

# Importar formularios
from forms.producto_form import ProductoForm
from forms.cliente_form import ClienteForm
from forms.proveedor_form import ProveedorForm
from forms.facturacion_form import FacturacionForm

# =====================================================
# CONFIGURACIÓN
# =====================================================
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'clave-secreta-aura-glow-2026')

# =====================================================
# RUTA PRINCIPAL
# =====================================================
@app.route('/')
def index():
    return render_template('index.html')

# =====================================================
# MÓDULO PRODUCTOS - LISTAR (SELECT + JOIN)
# =====================================================
@app.route('/productos')
def productos():
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("""
        SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock,
               pr.nombre AS proveedor
        FROM productos p
        LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
        ORDER BY p.id_producto
    """)
    lista = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('productos.html', productos=lista)

# =====================================================
# MÓDULO PRODUCTOS - AGREGAR (INSERT)
# =====================================================
@app.route('/productos/agregar', methods=['GET', 'POST'])
def agregar_producto():
    form = ProductoForm()
    conn = obtener_conexion()
    cur = conn.cursor()
    
    # Cargar los proveedores para el <select>
    cur.execute("SELECT id_proveedor, nombre FROM proveedores ORDER BY nombre")
    proveedores = cur.fetchall()
    form.id_proveedor.choices = [(0, 'Sin proveedor')] + [(p['id_proveedor'], p['nombre']) for p in proveedores]
    
    if form.validate_on_submit():
        id_prov = form.id_proveedor.data if form.id_proveedor.data != 0 else None
        cur.execute("""
            INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor)
            VALUES (%s, %s, %s, %s, %s)
        """, (form.nombre.data, form.descripcion.data, form.precio.data, form.stock.data, id_prov))
        conn.commit()
        cur.close()
        conn.close()
        flash('Producto agregado correctamente.', 'success')
        return redirect(url_for('productos'))
    
    cur.close()
    conn.close()
    return render_template('formulario_producto.html', form=form, accion='Agregar')

# =====================================================
# MÓDULO PRODUCTOS - EDITAR (UPDATE)
# =====================================================
@app.route('/productos/editar/<int:id>', methods=['GET', 'POST'])
def editar_producto(id):
    form = ProductoForm()
    conn = obtener_conexion()
    cur = conn.cursor()
    
    # Cargar proveedores para el select
    cur.execute("SELECT id_proveedor, nombre FROM proveedores ORDER BY nombre")
    proveedores = cur.fetchall()
    form.id_proveedor.choices = [(0, 'Sin proveedor')] + [(p['id_proveedor'], p['nombre']) for p in proveedores]
    
    # Buscar el producto por su id
    cur.execute("SELECT * FROM productos WHERE id_producto = %s", (id,))
    producto = cur.fetchone()
    
    if not producto:
        cur.close()
        conn.close()
        flash('Producto no encontrado.', 'danger')
        return redirect(url_for('productos'))
    
    if form.validate_on_submit():
        id_prov = form.id_proveedor.data if form.id_proveedor.data != 0 else None
        cur.execute("""
            UPDATE productos 
            SET nombre = %s, descripcion = %s, precio = %s, stock = %s, id_proveedor = %s
            WHERE id_producto = %s
        """, (form.nombre.data, form.descripcion.data, form.precio.data, form.stock.data, id_prov, id))
        conn.commit()
        cur.close()
        conn.close()
        flash('Producto actualizado correctamente.', 'success')
        return redirect(url_for('productos'))
    
    # Cargar los datos actuales en el formulario
    form.nombre.data = producto['nombre']
    form.descripcion.data = producto['descripcion']
    form.precio.data = producto['precio']
    form.stock.data = producto['stock']
    form.id_proveedor.data = producto['id_proveedor'] if producto['id_proveedor'] else 0
    
    cur.close()
    conn.close()
    return render_template('formulario_producto.html', form=form, accion='Editar')

# =====================================================
# MÓDULO PRODUCTOS - ELIMINAR (DELETE)
# =====================================================
@app.route('/productos/eliminar/<int:id>')
def eliminar_producto(id):
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("DELETE FROM productos WHERE id_producto = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    flash('Producto eliminado correctamente.', 'info')
    return redirect(url_for('productos'))

# =====================================================
# MÓDULO CLIENTES - LISTAR
# =====================================================
@app.route('/clientes')
def clientes():
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("SELECT * FROM clientes ORDER BY id_cliente")
    lista = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('clientes.html', clientes=lista)

# =====================================================
# MÓDULO CLIENTES - AGREGAR
# =====================================================
@app.route('/clientes/agregar', methods=['GET', 'POST'])
def agregar_cliente():
    form = ClienteForm()
    if form.validate_on_submit():
        conn = obtener_conexion()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO clientes (nombre, cedula, telefono, correo)
            VALUES (%s, %s, %s, %s)
        """, (form.nombre.data, form.cedula.data, form.telefono.data, form.correo.data))
        conn.commit()
        cur.close()
        conn.close()
        flash('Cliente agregado correctamente.', 'success')
        return redirect(url_for('clientes'))
    return render_template('formulario_cliente.html', form=form, accion='Agregar')

# =====================================================
# MÓDULO CLIENTES - ELIMINAR
# =====================================================
@app.route('/clientes/eliminar/<int:id>')
def eliminar_cliente(id):
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("DELETE FROM clientes WHERE id_cliente = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    flash('Cliente eliminado correctamente.', 'info')
    return redirect(url_for('clientes'))

# =====================================================
# MÓDULO PROVEEDORES - LISTAR
# =====================================================
@app.route('/proveedores')
def proveedores():
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("SELECT * FROM proveedores ORDER BY id_proveedor")
    lista = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('proveedores.html', proveedores=lista)

# =====================================================
# MÓDULO PROVEEDORES - AGREGAR
# =====================================================
@app.route('/proveedores/agregar', methods=['GET', 'POST'])
def agregar_proveedor():
    form = ProveedorForm()
    if form.validate_on_submit():
        conn = obtener_conexion()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO proveedores (nombre, telefono, correo)
            VALUES (%s, %s, %s)
        """, (form.nombre.data, form.telefono.data, form.correo.data))
        conn.commit()
        cur.close()
        conn.close()
        flash('Proveedor agregado correctamente.', 'success')
        return redirect(url_for('proveedores'))
    return render_template('formulario_proveedor.html', form=form, accion='Agregar')

# =====================================================
# MÓDULO PROVEEDORES - ELIMINAR
# =====================================================
@app.route('/proveedores/eliminar/<int:id>')
def eliminar_proveedor(id):
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("DELETE FROM proveedores WHERE id_proveedor = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    flash('Proveedor eliminado correctamente.', 'info')
    return redirect(url_for('proveedores'))

# =====================================================
# MÓDULO FACTURACIÓN - LISTAR (JOIN)
# =====================================================
@app.route('/facturacion')
def facturacion():
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("""
        SELECT f.id_factura, f.fecha, f.total, c.nombre AS cliente
        FROM facturas f
        JOIN clientes c ON f.id_cliente = c.id_cliente
        ORDER BY f.id_factura DESC
    """)
    lista = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('facturacion.html', facturas=lista)

# =====================================================
# MÓDULO FACTURACIÓN - AGREGAR
# =====================================================
@app.route('/facturacion/agregar', methods=['GET', 'POST'])
def agregar_factura():
    form = FacturacionForm()
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("SELECT id_cliente, nombre FROM clientes ORDER BY nombre")
    clientes = cur.fetchall()
    form.id_cliente.choices = [(c['id_cliente'], c['nombre']) for c in clientes]
    
    if form.validate_on_submit():
        cur.execute("""
            INSERT INTO facturas (id_cliente, fecha, total)
            VALUES (%s, %s, %s)
        """, (form.id_cliente.data, form.fecha.data, form.total.data))
        conn.commit()
        cur.close()
        conn.close()
        flash('Factura registrada correctamente.', 'success')
        return redirect(url_for('facturacion'))
    
    cur.close()
    conn.close()
    return render_template('formulario_facturacion.html', form=form, accion='Agregar')

# =====================================================
# MÓDULO FACTURACIÓN - ELIMINAR
# =====================================================
@app.route('/facturacion/eliminar/<int:id>')
def eliminar_factura(id):
    conn = obtener_conexion()
    cur = conn.cursor()
    cur.execute("DELETE FROM facturas WHERE id_factura = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    flash('Factura eliminada correctamente.', 'info')
    return redirect(url_for('facturacion'))

# =====================================================
# INICIALIZAR BD (solo la primera vez)
# =====================================================
def inicializar_bd():
    try:
        conn = obtener_conexion()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                usuario VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS proveedores (
                id_proveedor SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                telefono VARCHAR(20),
                correo VARCHAR(100)
            );
            CREATE TABLE IF NOT EXISTS productos (
                id_producto SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                precio NUMERIC(10, 2) NOT NULL,
                stock INTEGER NOT NULL DEFAULT 0,
                id_proveedor INTEGER REFERENCES proveedores(id_proveedor) ON DELETE SET NULL
            );
            CREATE TABLE IF NOT EXISTS clientes (
                id_cliente SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                cedula VARCHAR(20) UNIQUE,
                telefono VARCHAR(20),
                correo VARCHAR(100)
            );
            CREATE TABLE IF NOT EXISTS facturas (
                id_factura SERIAL PRIMARY KEY,
                id_cliente INTEGER NOT NULL REFERENCES clientes(id_cliente) ON DELETE CASCADE,
                fecha DATE NOT NULL,
                total NUMERIC(10, 2) NOT NULL
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Tablas verificadas/creadas correctamente.")
    except Exception as e:
        print(f"⚠️ Error al inicializar BD: {e}")

# =====================================================
# EJECUCIÓN
# =====================================================
if __name__ == '__main__':
    inicializar_bd()
    app.run(debug=True)