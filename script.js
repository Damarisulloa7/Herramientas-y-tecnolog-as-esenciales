// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Obtener elementos del DOM
    const formulario = document.getElementById('formProducto');
    const listaProductos = document.getElementById('listaProductos');
    const contador = document.getElementById('contadorProductos');
    const mensajeValidacion = document.getElementById('mensajeValidacion');

    // Arreglo para almacenar los productos (simula una base de datos)
    let productos = [];

    // Función para actualizar la lista y el contador
    function actualizarLista() {
        // Limpiar la lista actual
        listaProductos.innerHTML = '';

        // Recorrer el arreglo de productos y crear elementos li con Bootstrap
        productos.forEach((producto, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            // Contenido del producto con clases de Bootstrap
            const contenido = document.createElement('span');
            contenido.innerHTML = `<strong>${producto.nombre}</strong> (${producto.categoria}) - ${producto.descripcion}`;
            
            // Botón eliminar con clases de Bootstrap
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', function() {
                eliminarProducto(index);
            });

            li.appendChild(contenido);
            li.appendChild(btnEliminar);
            listaProductos.appendChild(li);
        });

        // Actualizar contador
        contador.textContent = productos.length;
    }

    // Función para eliminar un producto
    function eliminarProducto(index) {
        productos.splice(index, 1); // Eliminar del arreglo
        actualizarLista(); // Refrescar la lista
        mostrarMensaje('Producto eliminado correctamente.', 'success');
    }

    // Función para mostrar mensajes de validación
    function mostrarMensaje(mensaje, tipo) {
        mensajeValidacion.innerHTML = '';
        const div = document.createElement('div');
        div.className = `alert alert-${tipo} alert-dismissible fade show`;
        div.role = 'alert';
        div.innerHTML = `${mensaje} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        mensajeValidacion.appendChild(div);
    }

    // Manejar el evento submit del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar recarga de página

        // Obtener valores de los campos
        const nombre = document.getElementById('nombreProducto').value.trim();
        const categoria = document.getElementById('categoriaProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value.trim();

        // Validar que los campos no estén vacíos
        if (nombre === '' || descripcion === '') {
            mostrarMensaje('Por favor, completa todos los campos.', 'danger');
            return;
        }

        // Crear objeto producto
        const nuevoProducto = {
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion
        };

        // Agregar al arreglo
        productos.push(nuevoProducto);

        // Actualizar la lista
        actualizarLista();

        // Limpiar el formulario
        document.getElementById('nombreProducto').value = '';
        document.getElementById('descripcionProducto').value = '';

        // Mostrar mensaje de éxito
        mostrarMensaje('Producto agregado correctamente.', 'success');
    });

});