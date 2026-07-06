// =====================================================
// SCRIPT PARA LA GESTIÓN DE PRODUCTOS CON VALIDACIONES DINÁMICAS (Semana 6)
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS DEL DOM =====
    const formProducto = document.getElementById('formProducto');
    const nombreInput = document.getElementById('nombreProducto');
    const categoriaSelect = document.getElementById('categoriaProducto');
    const descripcionInput = document.getElementById('descripcionProducto');
    const listaProductos = document.getElementById('listaProductos');
    const contadorSpan = document.getElementById('contadorProductos');
    const mensajeValidacion = document.getElementById('mensajeValidacion');
    const btnAgregar = document.getElementById('btnAgregar');

    // ===== VARIABLES =====
    let contador = 0;

    // ===== FUNCIONES DE VALIDACIÓN POR CAMPO =====

    // Validar nombre: no vacío y mínimo 3 caracteres
    function validarNombre() {
        const valor = nombreInput.value.trim();
        const esValido = valor.length >= 3 && valor.length <= 50;
        if (esValido) {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
        } else {
            nombreInput.classList.remove('is-valid');
            nombreInput.classList.add('is-invalid');
        }
        return esValido;
    }

    // Validar categoría: debe seleccionar una opción distinta a la primera (vacía)
    function validarCategoria() {
        const esValido = categoriaSelect.value !== '';
        if (esValido) {
            categoriaSelect.classList.remove('is-invalid');
            categoriaSelect.classList.add('is-valid');
        } else {
            categoriaSelect.classList.remove('is-valid');
            categoriaSelect.classList.add('is-invalid');
        }
        return esValido;
    }

    // Validar descripción: no vacía y mínimo 10 caracteres
    function validarDescripcion() {
        const valor = descripcionInput.value.trim();
        const esValido = valor.length >= 10 && valor.length <= 200;
        if (esValido) {
            descripcionInput.classList.remove('is-invalid');
            descripcionInput.classList.add('is-valid');
        } else {
            descripcionInput.classList.remove('is-valid');
            descripcionInput.classList.add('is-invalid');
        }
        return esValido;
    }

    // Validar todo el formulario
    function validarFormulario() {
        const nombreValido = validarNombre();
        const categoriaValida = validarCategoria();
        const descripcionValida = validarDescripcion();
        return nombreValido && categoriaValida && descripcionValida;
    }

    // ===== FUNCIÓN PARA MOSTRAR MENSAJES GENERALES =====
    function mostrarMensajeGeneral(mensaje, tipo = 'danger') {
        mensajeValidacion.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        // Auto-eliminar mensaje después de 4 segundos
        setTimeout(() => {
            const alert = mensajeValidacion.querySelector('.alert');
            if (alert) {
                alert.classList.remove('show');
                setTimeout(() => mensajeValidacion.innerHTML = '', 300);
            }
        }, 4000);
    }

    // ===== FUNCIÓN PARA ACTUALIZAR EL CONTADOR =====
    function actualizarContador() {
        contadorSpan.textContent = contador;
    }

    // ===== FUNCIÓN PARA AGREGAR UN PRODUCTO (solo si es válido) =====
    function agregarProducto(event) {
        event.preventDefault();

        // Validar todos los campos antes de agregar
        if (!validarFormulario()) {
            mostrarMensajeGeneral('⚠️ Por favor, corrige los campos marcados en rojo.', 'warning');
            return;
        }

        // Obtener valores
        const nombre = nombreInput.value.trim();
        const categoria = categoriaSelect.value;
        const descripcion = descripcionInput.value.trim();

        // Mostrar mensaje de éxito
        mostrarMensajeGeneral('✅ Producto agregado correctamente.', 'success');

        // ===== CREAR EL ELEMENTO DEL PRODUCTO =====
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
                contador--;
                actualizarContador();
                mostrarMensajeGeneral('🗑️ Producto eliminado.', 'info');
            }, 300);
        });

        li.appendChild(contenido);
        li.appendChild(btnEliminar);
        listaProductos.appendChild(li);

        // Incrementar contador
        contador++;
        actualizarContador();

        // Resetear formulario y quitar clases de validación
        formProducto.reset();
        nombreInput.classList.remove('is-valid', 'is-invalid');
        categoriaSelect.classList.remove('is-valid', 'is-invalid');
        descripcionInput.classList.remove('is-valid', 'is-invalid');
        nombreInput.focus();

        // Desplazar suavemente hacia la lista
        listaProductos.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // ===== ASIGNAR EVENTOS EN TIEMPO REAL =====
    // Evento input: valida mientras el usuario escribe
    nombreInput.addEventListener('input', validarNombre);
    descripcionInput.addEventListener('input', validarDescripcion);
    categoriaSelect.addEventListener('change', validarCategoria);

    // Evento blur: valida al salir del campo (para dar feedback adicional)
    nombreInput.addEventListener('blur', validarNombre);
    descripcionInput.addEventListener('blur', validarDescripcion);
    categoriaSelect.addEventListener('blur', validarCategoria);

    // Evento submit del formulario
    formProducto.addEventListener('submit', agregarProducto);

    // ===== FUNCIÓN PARA AGREGAR PRODUCTOS DE EJEMPLO =====
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
                contador--;
                actualizarContador();
            }, 300);
        });
        
        listaProductos.appendChild(li);
        contador++;
        actualizarContador();
    }

    // Cargar productos de ejemplo
    agregarProductoEjemplo('Base Líquida Matte', 'Maquillaje', 'Cobertura media-alta, acabado mate, 12 horas de duración.');
    agregarProductoEjemplo('Paleta de Sombras Nude', 'Sombras', '10 tonos tierra y rosados, alta pigmentación.');
    agregarProductoEjemplo('Labial Líquido Rojo', 'Labiales', 'Rojo intenso, acabado mate, larga duración.');

});