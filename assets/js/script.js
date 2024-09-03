
// Declarar las clases antes de cualquier uso
class Producto {
    constructor(imagen, formato, nombre, precio) {
    this.imagen = imagen;
    this.formato = formato;
    this.nombre = nombre;
    this.precio = precio;
    }

// Método para crear la tarjeta de producto
    crearTarjeta() {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'sm:max-w-1/4 sm:w-1/4 md:w-1/6 md:max-w-1/6  md:m-1 flex flex-col items-center w-1/2 justify-between h-84 border p-2 rounded text-white border-gray-300';

    const contenido = `
        <div>
        <img class="p-2 h-9/10 w-9/10 rounded" src="${this.imagen}" alt="">
        <h4 class="text-gray-400 font-mono text-center text-sm">Formato: ${this.formato}</h4>
        <h4 class="nombre px-5 mt-3 text-black font-mono text-center text-sm">${this.nombre}</h4>
        <h5 class="precio mt-3 text-black font-mono text-center text-sm font-bold">${this.precio}</h5>
        </div>`;
    
    tarjeta.innerHTML = contenido;

     // Crear el botón y agregarlo al elemento de la tarjeta
    const boton = document.createElement('button');
    boton.className = 'botonComprar flex flex-col items-center text-xs font-semibold mt-2 mb-4 w-3/4 border text-black border-gray-500 rounded bg-white p-3 text-center';
    boton.innerHTML = '<h1>Agregar al carrito</h1>';
    
      // Añadir el evento de clic al botón
    boton.addEventListener('click', () => {
    carrito.elegirCantidad(this); // Llama a la función de elegir cantidad en el carrito
    });

    boton.addEventListener('mouseover', () => {
        boton.style.backgroundColor ='#d4e6f1';
        boton.style.fontSize='0.8em'
        boton.style.transition='all 0.3s ease-in-out'
    }
    )
    boton.addEventListener('mouseout', () => {
        boton.style.backgroundColor = 'white';
        boton.style.fontSize='0.7em'
    })

    tarjeta.appendChild(boton);  
    return tarjeta;
    }
}

function quitarSimbolo(palabra) {
    return palabra.substring(1);
}

//clase carro
class Carrito {
    constructor() {
        this.productos = []; // Inicializa el array de productos vacío
    }

    addToCart(producto, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto); // Añadir el producto al array
        }
    }

    elegirCantidad(producto) {
        // Mostrar prompt para ingresar la cantidad
        alertify.prompt('Cantidad', 'Seleccione cantidad', '1',
            (evt, value) => { 
                // Convertir cantidad a número y añadir productos al carrito
                const cantidad = parseInt(value, 10);
                if (!isNaN(cantidad) && cantidad > 0) {
                    this.addToCart(producto, cantidad);

                    console.log(this.productos.length);
                    // Actualizar el número de productos en el carrito
                    let carroNav = document.querySelector(".carroNav");
                    carroNav.textContent = this.productos.length;
                    carroNav.classList.remove("hidden");

                    // Mostrar la lista de productos en el carrito
                    console.log(this.mostrarLista());

                    alertify.success(`Agregados al carrito: ${cantidad} discos`);
                } else {
                    alertify.error('Cantidad inválida');
                }
            },
            () => { alertify.error('Cancel'); }
        );
    }

    mostrarLista() {
        // Contar la cantidad de cada producto
        const conteoProductos = this.productos.reduce((conteo, producto) => {
            const clave = producto.nombre;
            if (!conteo[clave]) {
                conteo[clave] = { producto: producto, cantidad: 0 };
            }
            conteo[clave].cantidad += 1;
            return conteo;
        }, {});

        // Construir la lista HTML
        return Object.values(conteoProductos).map(({ producto, cantidad }) =>
            `<p>${producto.nombre} - ${producto.precio} <b>cantidad: </b>${cantidad}</p>`
        ).join('');
    }

    calcularTotal() {
        // Convierte los precios con formato 'xx.xxx' a números y calcula el total
        const total = this.productos.reduce((acumulador, producto) => {
            // Elimina el punto de separación de miles y convierte a número flotante
            const precio = parseFloat(quitarSimbolo(producto.precio.replace(/\./g, '')));
            return acumulador + precio;
        }, 0);

        // Formatea el total a 3 dígitos decimales
        const totalFormateado = (total / 1000).toFixed(3);

        // Muestra el total formateado
        console.log(`Total: ${totalFormateado}`);

        // Devuelve el total formateado
        return totalFormateado;
    }
}

  // Crear una instancia única de Carrito después de declarar las clases
const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos');
    
    // Crear los productos
    const listproductos=[new Producto('./assets/img/P1.webp','vinilo','Los Prisioneros - La Voz De Los 80 (Vinilo, Ed. Chilena, 2021, Picture Disc)','$19.990'),
                new Producto('./assets/img/P2.webp','cd','The Smiths – Hatful Of Hollow (CD, Ed. EU, 2011, Remastered','$14.990'),
                new Producto('./assets/img/P3.webp','Vinilo','Talk Talk - The Partys Over (Vinilo, Ed. Europe, 2022)','$19.990'),
                new Producto('./assets/img/P4.webp','Vinilo','My Bloody Valentine - Loveless (Vini, Ed. Europe, 1996)','$19.990'),
                new Producto('./assets/img/P5.webp','cd','Stereolab - Emperor Tomato Ketchup (CD, Ed. Europe, 1990)','$15.990'),
                new Producto('./assets/img/P6.webp','cd','Ryuichi Sakamoto - Beauty (CD, Ed. Europe, 1990)','$19.990'),
                new Producto('./assets/img/P7.webp','Vinilo','Jorge Gonzalez - Mi destino (Vinilo, Ed. Europe, 2001)','$19.990'),
                new Producto('./assets/img/P8.webp','cd','The Get Up Kids - four Minute Mile (cd, Ed. EU, 2018)','$19.990'),
                new Producto('./assets/img/P9.webp','Vinilo','Mitski - Be the Cowboy (Vinilo, EEUU, 2018, Picture Disc)','$19.990'),
                new Producto('./assets/img/P10.webp','Vinilo','Los Vidrios Quebrados - Fictions (Vinilo, Chile, 2018, Picture Disc)','$19.990')]; 


    listproductos.forEach(producto => {
    productosContainer.appendChild(producto.crearTarjeta());
        });
    });


    document.getElementById('botonCarro').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('hidden');
    document.getElementById('listadoCompra').innerHTML = `<b>Productos en el carrito:</b><br>
        ${carrito.mostrarLista()} <br><b>
        total: $${carrito.calcularTotal()}<b>`;
    });

    document.getElementById('terminarCompra').addEventListener('click', function() {
    carrito.productos = [];
    let carroNav = document.querySelector(".carroNav");
    carroNav.classList.add("hidden");
    document.getElementById('overlay').classList.add('hidden');
    alertify.success('Compra Procesada');
    });

    document.getElementById('closeOverlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.add('hidden');

    });


