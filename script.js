// ======================================================
// SCRIPT COMPLETO PARA AURA GLOW COSMETICS
// Semana 8 - Mejora de interfaces con Bootstrap
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== ELEMENTOS DEL DOM =====
    const formProducto = document.getElementById('formProducto');
    const nombreInput = document.getElementById('nombreProducto');
    const categoriaSelect = document.getElementById('categoriaProducto');
    const descripcionInput = document.getElementById('descripcionProducto');
    const listaProductos = document.getElementById('listaProductos');
    const contadorSpan = document.getElementById('contadorProductos');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const spinnerCarga = document.getElementById('spinnerCarga');
    const btnSimularCarga = document.getElementById('btnSimularCarga');

    // ===== ARRAY DE PRODUCTOS (almacenamiento en memoria) =====
    let productos = [];

    // ===== FUNCIÓN PARA ACTUALIZAR EL CONTADOR =====
    function actualizarContador() {
        contadorSpan.textContent = productos.length;
    }

    // ===== FUNCIÓN PARA MOSTRAR MENSAJES DE VALIDACIÓN =====
    function mostrarMensaje(mensaje, tipo = 'danger') {
        mensajeValidacion.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => {
            const alert = mensajeValidacion.querySelector('.alert');
            if (alert) {
                alert.classList.remove('show');
                setTimeout(() => mensajeValidacion.innerHTML = '', 300);
            }
        }, 4000);
    }

    // ===== FUNCIÓN PARA RENDERIZAR LOS PRODUCTOS EN CARDS =====
    function renderizarProductos() {
        // Limpiar la lista
        listaProductos.innerHTML = '';

        // Si no hay productos, mostrar mensaje
        if (productos.length === 0) {
            listaProductos.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        <i class="fas fa-info-circle"></i> No hay productos registrados. ¡Agrega uno!
                    </div>
                </div>
            `;
            actualizarContador();
            return;
        }

        // Renderizar cada producto como una card
        productos.forEach((producto, index) => {
            const col = document.createElement('div');
            col.className = 'col-12';

            const card = document.createElement('div');
            card.className = 'card shadow-sm';
            card.innerHTML = `
                <div class="card-body d-flex justify-content-between align-items-start">
                    <div>
                        <h5 class="card-title mb-1">
                            <i class="fas fa-star text-warning"></i> ${producto.nombre}
                            <span class="badge bg-secondary ms-2">${producto.categoria}</span>
                        </h5>
                        <p class="card-text text-muted small">${producto.descripcion}</p>
                        <small class="text-muted">ID: #${index + 1}</small>
                    </div>
                    <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
            `;
            col.appendChild(card);
            listaProductos.appendChild(col);
        });

        actualizarContador();

        // Asignar eventos a los botones de eliminar
        document.querySelectorAll('.eliminar-producto').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                eliminarProducto(index);
            });
        });
    }

    // ===== FUNCIÓN PARA ELIMINAR UN PRODUCTO =====
    function eliminarProducto(index) {
        // Confirmación usando modal de Bootstrap (simulada con confirm nativo)
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            productos.splice(index, 1);
            renderizarProductos();
            mostrarMensaje('🗑️ Producto eliminado correctamente.', 'info');
        }
    }

    // ===== FUNCIÓN PARA AGREGAR UN PRODUCTO =====
    function agregarProducto(event) {
        event.preventDefault();

        // Limpiar validaciones previas
        nombreInput.classList.remove('is-valid', 'is-invalid');
        categoriaSelect.classList.remove('is-valid', 'is-invalid');
        descripcionInput.classList.remove('is-valid', 'is-invalid');

        // Obtener valores
        const nombre = nombreInput.value.trim();
        const categoria = categoriaSelect.value;
        const descripcion = descripcionInput.value.trim();

        let valid = true;

        // Validar nombre (mínimo 3 caracteres)
        if (nombre === '' || nombre.length < 3) {
            nombreInput.classList.add('is-invalid');
            document.getElementById('nombreFeedback').textContent = 'El nombre debe tener al menos 3 caracteres.';
            valid = false;
        } else {
            nombreInput.classList.add('is-valid');
        }

        // Validar categoría
        if (categoria === '') {
            categoriaSelect.classList.add('is-invalid');
            document.getElementById('categoriaFeedback').textContent = 'Debes seleccionar una categoría.';
            valid = false;
        } else {
            categoriaSelect.classList.add('is-valid');
        }

        // Validar descripción (mínimo 10 caracteres)
        if (descripcion === '' || descripcion.length < 10) {
            descripcionInput.classList.add('is-invalid');
            document.getElementById('descripcionFeedback').textContent = 'La descripción debe tener al menos 10 caracteres.';
            valid = false;
        } else {
            descripcionInput.classList.add('is-valid');
        }

        if (!valid) {
            mostrarMensaje('⚠️ Por favor, corrige los campos marcados en rojo.', 'warning');
            return;
        }

        // Agregar producto al array
        const nuevoProducto = {
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion
        };
        productos.push(nuevoProducto);

        // Renderizar la lista
        renderizarProductos();

        // Mostrar mensaje de éxito
        mostrarMensaje('✅ Producto agregado correctamente.', 'success');

        // Limpiar formulario
        formProducto.reset();
        nombreInput.classList.remove('is-valid', 'is-invalid');
        categoriaSelect.classList.remove('is-valid', 'is-invalid');
        descripcionInput.classList.remove('is-valid', 'is-invalid');
        nombreInput.focus();

        // Desplazar hacia la lista
        document.getElementById('listaProductos').scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // ===== FUNCIÓN PARA SIMULAR CARGA (spinner) =====
    function simularCarga() {
        // Mostrar spinner
        spinnerCarga.style.display = 'block';
        btnSimularCarga.disabled = true;

        // Simular proceso asíncrono
        setTimeout(() => {
            spinnerCarga.style.display = 'none';
            btnSimularCarga.disabled = false;
            mostrarMensaje('✅ Carga completada exitosamente.', 'success');
            // Podríamos agregar productos de ejemplo aquí si quisiéramos
        }, 2500);
    }

    // ===== VALIDACIONES EN TIEMPO REAL =====
    // Validar nombre mientras se escribe
    nombreInput.addEventListener('input', function() {
        if (this.value.trim().length >= 3) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            if (this.value.trim().length > 0) {
                this.classList.add('is-invalid');
            }
        }
    });

    // Validar categoría al cambiar
    categoriaSelect.addEventListener('change', function() {
        if (this.value !== '') {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });

    // Validar descripción mientras se escribe
    descripcionInput.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            if (this.value.trim().length > 0) {
                this.classList.add('is-invalid');
            }
        }
    });

    // ===== EVENTOS =====
    formProducto.addEventListener('submit', agregarProducto);
    btnSimularCarga.addEventListener('click', simularCarga);

    // ===== INICIALIZAR CON PRODUCTOS DE EJEMPLO =====
    function inicializarProductosEjemplo() {
        const ejemplos = [
            { nombre: 'Base Líquida Matte', categoria: 'Maquillaje', descripcion: 'Cobertura media-alta, acabado mate, 12 horas de duración.' },
            { nombre: 'Paleta de Sombras Nude', categoria: 'Sombras', descripcion: '10 tonos tierra y rosados, alta pigmentación.' },
            { nombre: 'Labial Líquido Rojo', categoria: 'Labiales', descripcion: 'Rojo intenso, acabado mate, larga duración.' }
        ];
        productos = ejemplos;
        renderizarProductos();
    }

    inicializarProductosEjemplo();

    // Mostrar mensaje de bienvenida con alerta de Bootstrap
    setTimeout(() => {
        mostrarMensaje('✨ Bienvenido a Aura Glow Cosmetics. ¡Registra tus productos favoritos!', 'info');
    }, 500);

});