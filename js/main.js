//! CREO ARRAY DE PRODUCTOS
// Array que contiene información sobre los productos disponibles
const productos = [
    {
        id: "royal-canin-mini-adult-3kg",
        nombre: "Royal Canin Mini Adult 3 Kg",
        imagen: "./img/promo1.png",
        precioAnterior: 10300,
        precio: 9270
    },
    {
        id: "royal-canin-gato-fit-1-5kg",
        nombre: "Royal Canin Gato Fit 1,5 Kg",
        imagen: "./img/promo2.png",
        precioAnterior: 8100,
        precio: 7290
    },
    {
        id: "royal-canin-mini-puppy-3kg",
        nombre: "Royal Canin  Mini Puppy 3 Kg",
        imagen: "./img/promo3.png",
        precioAnterior: 11250,
        precio: 10125
    },
    {
        id: "royal-canin-gato-indoor-1-5kg",
        nombre: "Royal Canin Gato Indoor 1,5 Kg",
        imagen: "./img/promo4.png",
        precioAnterior: 8100,
        precio: 7290
    }
];


//! LLAMADOS DEL DOM
const contenedorHomeProductos = document.querySelector("#contenedorHomeProductos");
let btnAgregar;
const numeroCantidad = document.querySelector(".numeroCantidad");


//! FUNCIÓN PARA CARGAR PRODUCTOS A LA PÁGINA HOME
function cargarProductos() {
    if (contenedorHomeProductos) {
        // Iterar sobre cada producto y agregarlo al DOM
        productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("card", "cardIndividual", "col-xl-3", "col-md-6", "col-sm-12", "h-100");
            div.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top mx-auto" alt="${producto.nombre}">
        <h2 class="card-title nombreProducto">${producto.nombre}</h2>
        <h3> <span> $${producto.precioAnterior.toLocaleString()} </span> | $${producto.precio.toLocaleString()} </h3>
        <button type="button" class="btnProductos" id="${producto.id}"> Añadir al Carrito </button>
        `;
            contenedorHomeProductos.append(div);
        });
    };

    btnAgregar = document.querySelectorAll(".btnProductos");
    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductoAlCarrito);
    });

};

cargarProductos();


//! CREO ARRAY DE CARRITO 
// Array que almacena los productos seleccionados por el usuario para su compra.
let productosEnCarrito;

// Recuperar los datos del carrito de compras almacenados en el almacenamiento local del navegador.
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
// Verificar si hay datos en el almacenamiento local.
if (productosEnCarritoLS) {
    // Si hay datos, parsearlos y asignarlos a la variable productosEnCarrito.
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    // Si no hay datos, inicializar productosEnCarrito como un array vacío.
    productosEnCarrito = [];
}


//! FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
function agregarProductoAlCarrito(e) {

    // Obtenemos el ID del botón
    const botonId = e.currentTarget.id;

    // Buscamos el producto correspondiente al ID en el array de productos
    const productoAgregado = productos.find(p => p.id === botonId);

    // Verificar si el producto ya está en el carrito
    const productoEnCarritoIndex = productosEnCarrito.findIndex(item => item.nombre === productoAgregado.nombre);

    // Si el producto ya está en el carrito, aumenta la cantidad.
    if (productoEnCarritoIndex !== -1) {
        productosEnCarrito[productoEnCarritoIndex].cantidad++;
    } else {
        // Si el producto no está en el carrito, lo agrega.
        productosEnCarrito.push({ ...productoAgregado, cantidad: 1 });
    };

    // Mostrar mensaje de confirmación de agregado al carrito
    const nodoContenidoToastify = document.createElement('div');
    nodoContenidoToastify.innerHTML = '<img src="./img/iconocarrito3.png" class="carritoProductoAgregado" alt="Ícono del Carrito con Producto Agregado"> Producto agregado al carrito';

    Toastify({
        node: nodoContenidoToastify,
        duration: 2000,
        close: true,
        style: {
            background: "#9C4A8C",
            borderRadius: "1rem",
            color: "#fafafa",
            fontSize: "1.2rem",
            padding: "5px",
            display: "flex",
            justifyContent: "space-evenly",
            width: "24rem"
        },
        stopOnFocus: true,
    }).showToast()

    // Actualizar el número que muestra la cantidad de productos en el carrito.
    actualizarNumeroCantidad();

    // Guardar los productos en el carrito en el almacenamiento local.
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}


//! FUNCIÓN PARA ACTUALIZAR EL NÚMERO DE PRODUCTOS EN EL CARRITO MOSTRADO EN LA INTERFAZ
function actualizarNumeroCantidad() {
    // Inicializar la cantidad inicial en 0
    let cantidadInicial = 0;

    // Verificar si hay productos en el carrito
    if (productosEnCarrito.length > 0) {
         // Si hay productos, sumar las cantidades de todos los productos en el carrito
        cantidadInicial = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    } else {
         // Si no hay productos, intentar obtener los productos desde el almacenamiento local
        productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
        if (productosEnCarritoLS) {
            // Si hay productos en el almacenamiento local, sumar las cantidades de todos los productos
            const productosEnCarritoParsed = JSON.parse(productosEnCarritoLS);
            cantidadInicial = productosEnCarritoParsed.reduce((acc, producto) => acc + producto.cantidad, 0);
        }
    };

    // Actualizar el número mostrado en la interfaz
    numeroCantidad.innerText = cantidadInicial;
}

// Inicializar el número de productos en el carrito al cargar la página
actualizarNumeroCantidad();