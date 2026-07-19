// =============================================================
// SCRIPT PARA AURA GLOW COSMETICS - Semana 7
// =============================================================

document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // 1. DATOS DE EJEMPLO (arreglo de objetos)
    // =========================================================
    const productosDestacados = [
        { id: 1, nombre: 'Base Líquida Matte', categoria: 'Maquillaje', descripcion: 'Cobertura media-alta, acabado mate, 12h de duración.', estado: 'disponible' },
        { id: 2, nombre: 'Paleta de Sombras Nude', categoria: 'Sombras', descripcion: '10 tonos tierra y rosados, alta pigmentación.', estado: 'disponible' },
        { id: 3, nombre: 'Labial Líquido Rojo', categoria: 'Labiales', descripcion: 'Rojo intenso, acabado mate, larga duración.', estado: 'agotado' },
        { id: 4, nombre: 'Crema Hidratante Facial', categoria: 'Cuidado Facial', descripcion: 'Hidratación profunda con ácido hialurónico.', estado: 'disponible' }
    ];

    // =========================================================
    // 2. RENDERIZAR PRODUCTOS DESTACADOS (estructura repetitiva)
    // =========================================================
    const contenedorProductos = document.getElementById('productosDestacados');

    function renderizarProductosDestacados() {
        contenedorProductos.innerHTML = ''; // Limpiar
        productosDestacados.forEach(producto => {
            // Condicional para mostrar el badge según el estado
            let badgeHtml = '';
            if (producto.estado === 'disponible') {
                badgeHtml = `<span class="badge bg-success">Disponible</span>`;
            } else if (producto.estado === 'agotado') {
                badgeHtml = `<span class="badge bg-danger">Agotado</span>`;
            } else {
                badgeHtml = `<span class="badge bg-warning text-dark">Próximamente</span>`;
            }

            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <div class="card h-100 text-center p-3">
                    <i class="fas fa-box fa-3x text-primary"></i>
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        ${badgeHtml}
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(col);
        });
    }

    renderizarProductosDestacados();

    // =========================================================
    // 3. GESTIÓN DE PRODUCTOS (registro dinámico)
    // =========================================================
    const formProducto = document.getElementById('formProducto');
    const nombreInput = document.getElementById('nombreProducto');
    const categoriaSelect = document.getElementById('categoriaProducto');
    const descripcionInput = document.getElementById('descripcionProducto');
    const listaProductos = document.getElementById('listaProductos');
    const contadorSpan = document.getElementById('contadorProductos');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const btnAgregar = document.getElementById('btnAgregar');

    // Contador de productos registrados manualmente
    let contadorProductos = 0;

    // =========================================================
    // 4. FUNCIONES DE VALIDACIÓN DINÁMICA
    // =========================================================

    // Validar nombre (mínimo 3 caracteres)
    function validarNombre() {
        const valor = nombreInput.value.trim();
        if (valor.length < 3) {
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
            document.getElementById('nombreError').style.display = 'block';
            return false;
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
            document.getElementById('nombreError').style.display = 'none';
            return true;
        }
    }

    // Validar categoría (no vacía)
    function validarCategoria() {
        const valor = categoriaSelect.value;
        if (valor === '') {
            categoriaSelect.classList.add('is-invalid');
            categoriaSelect.classList.remove('is-valid');
            document.getElementById('categoriaError').style.display = 'block';
            return false;
        } else {
            categoriaSelect.classList.remove('is-invalid');
            categoriaSelect.classList.add('is-valid');
            document.getElementById('categoriaError').style.display = 'none';
            return true;
        }
    }

    // Validar descripción (mínimo 10 caracteres)
    function validarDescripcion() {
        const valor = descripcionInput.value.trim();
        if (valor.length < 10) {
            descripcionInput.classList.add('is-invalid');
            descripcionInput.classList.remove('is-valid');
            document.getElementById('descripcionError').style.display = 'block';
            return false;
        } else {
            descripcionInput.classList.remove('is-invalid');
            descripcionInput.classList.add('is-valid');
            document.getElementById('descripcionError').style.display = 'none';
            return true;
        }
    }

    // Validar todo el formulario
    function validarFormulario() {
        const valNombre = validarNombre();
        const valCategoria = validarCategoria();
        const valDescripcion = validarDescripcion();
        return valNombre && valCategoria && valDescripcion;
    }

    // =========================================================
    // 5. EVENTOS EN TIEMPO REAL (input, blur)
    // =========================================================
    nombreInput.addEventListener('input', validarNombre);
    nombreInput.addEventListener('blur', validarNombre);
    categoriaSelect.addEventListener('change', validarCategoria);
    categoriaSelect.addEventListener('blur', validarCategoria);
    descripcionInput.addEventListener('input', validarDescripcion);
    descripcionInput.addEventListener('blur', validarDescripcion);

    // =========================================================
    // 6. MOSTRAR MENSAJES DE RETROALIMENTACIÓN
    // =========================================================
    function mostrarMensaje(mensaje, tipo = 'success') {
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

    // =========================================================
    // 7. AGREGAR PRODUCTO (evento submit)
    // =========================================================
    formProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validar todo el formulario
        if (!validarFormulario()) {
            mostrarMensaje('❌ Por favor, corrige los campos marcados en rojo.', 'danger');
            return;
        }

        // Obtener datos
        const nombre = nombreInput.value.trim();
        const categoria = categoriaSelect.value;
        const descripcion = descripcionInput.value.trim();

        // Crear elemento li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const contenido = document.createElement('div');
        contenido.innerHTML = `
            <strong>${nombre}</strong>
            <span class="badge bg-secondary ms-2">${categoria}</span>
            <p class="mb-0 text-muted small">${descripcion}</p>
        `;

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger btn-sm';
        btnEliminar.innerHTML = '<i class="fas fa-trash"></i> Eliminar';

        btnEliminar.addEventListener('click', function() {
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                contadorProductos--;
                actualizarContador();
                mostrarMensaje('🗑️ Producto eliminado correctamente.', 'info');
            }, 300);
        });

        li.appendChild(contenido);
        li.appendChild(btnEliminar);
        listaProductos.appendChild(li);

        // Actualizar contador
        contadorProductos++;
        actualizarContador();

        // Limpiar formulario y resetear validaciones
        formProducto.reset();
        nombreInput.classList.remove('is-valid', 'is-invalid');
        categoriaSelect.classList.remove('is-valid', 'is-invalid');
        descripcionInput.classList.remove('is-valid', 'is-invalid');
        document.getElementById('nombreError').style.display = 'none';
        document.getElementById('categoriaError').style.display = 'none';
        document.getElementById('descripcionError').style.display = 'none';

        mostrarMensaje('✅ Producto agregado correctamente.', 'success');
        nombreInput.focus();
    });

    // =========================================================
    // 8. ACTUALIZAR CONTADOR
    // =========================================================
    function actualizarContador() {
        contadorSpan.textContent = contadorProductos;
    }

    // =========================================================
    // 9. CARGAR PRODUCTOS DE EJEMPLO AL INICIAR
    // =========================================================
    function agregarProductoEjemplo(nombre, categoria, descripcion) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <strong>${nombre}</strong>
                <span class="badge bg-secondary ms-2">${categoria}</span>
                <p class="mb-0 text-muted small">${descripcion}</p>
            </div>
            <button class="btn btn-danger btn-sm eliminar-producto"><i class="fas fa-trash"></i> Eliminar</button>
        `;
        const btnEliminar = li.querySelector('.eliminar-producto');
        btnEliminar.addEventListener('click', function() {
            li.classList.add('fade-out');
            setTimeout(() => {
                li.remove();
                contadorProductos--;
                actualizarContador();
            }, 300);
        });
        listaProductos.appendChild(li);
        contadorProductos++;
        actualizarContador();
    }

    // Agregar 3 productos de muestra
    agregarProductoEjemplo('Base Líquida Matte', 'Maquillaje', 'Cobertura media-alta, acabado mate, 12h de duración.');
    agregarProductoEjemplo('Paleta de Sombras Nude', 'Sombras', '10 tonos tierra y rosados, alta pigmentación.');
    agregarProductoEjemplo('Labial Líquido Rojo', 'Labiales', 'Rojo intenso, acabado mate, larga duración.');

});