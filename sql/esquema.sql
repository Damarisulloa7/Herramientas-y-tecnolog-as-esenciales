-- =====================================================
-- ESQUEMA DE BASE DE DATOS - AURA GLOW COSMETICS
-- Motor: PostgreSQL
-- =====================================================

-- Eliminar tablas si existen (para recrear desde cero)
DROP TABLE IF EXISTS facturas CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS proveedores CASCADE;

-- =====================================================
-- TABLA: proveedores
-- =====================================================
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre       VARCHAR(100) NOT NULL,
    telefono     VARCHAR(20),
    correo       VARCHAR(100)
);

-- =====================================================
-- TABLA: productos
-- Relación: id_proveedor → proveedores(id_proveedor)
-- =====================================================
CREATE TABLE productos (
    id_producto  SERIAL PRIMARY KEY,
    nombre       VARCHAR(100) NOT NULL,
    descripcion  TEXT,
    precio       NUMERIC(10, 2) NOT NULL CHECK (precio > 0),
    stock        INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    id_proveedor INTEGER,
    CONSTRAINT fk_producto_proveedor
        FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor)
        ON DELETE SET NULL
);

-- =====================================================
-- TABLA: clientes
-- =====================================================
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    cedula     VARCHAR(10) UNIQUE,
    telefono   VARCHAR(20),
    correo     VARCHAR(100)
);

-- =====================================================
-- TABLA: facturas
-- Relación: id_cliente → clientes(id_cliente)
-- =====================================================
CREATE TABLE facturas (
    id_factura SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha      DATE NOT NULL,
    total      NUMERIC(10, 2) NOT NULL CHECK (total > 0),
    CONSTRAINT fk_factura_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente)
        ON DELETE CASCADE
);

-- =====================================================
-- DATOS DE EJEMPLO (opcional, pero recomendado)
-- =====================================================

INSERT INTO proveedores (nombre, telefono, correo) VALUES
('Distribuidora Beauty S.A.', '022345678', 'contacto@beauty.com'),
('Cosméticos Naturales Cía.', '022987654', 'ventas@naturales.com');

INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES
('Base Líquida Matte', 'Cobertura media-alta, acabado mate, 12 horas de duración.', 25.00, 10, 1),
('Paleta de Sombras Nude', '10 tonos tierra y rosados, alta pigmentación.', 35.00, 5, 1),
('Labial Líquido Rojo', 'Rojo intenso, acabado mate, larga duración.', 18.00, 0, 2),
('Serum Facial Revitalizante', 'Con vitamina C y ácido hialurónico.', 40.00, 8, 2);

INSERT INTO clientes (nombre, cedula, telefono, correo) VALUES
('María González', '1712345678', '0998123456', 'maria@email.com'),
('Carlos Pérez', '1787654321', '0998765432', 'carlos@email.com'),
('Ana Rodríguez', '1799887766', '0998112233', 'ana@email.com');

INSERT INTO facturas (id_cliente, fecha, total) VALUES
(1, '2026-08-20', 85.00),
(2, '2026-08-21', 120.00),
(3, '2026-08-22', 45.00);