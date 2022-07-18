

let productos
let carritoProductos = []



//--- query selectors---

const productosContainer = document.querySelector('.cardContainer')
const nameBox = document.querySelector('.nameBox')
const descBox = document.querySelector('.descBox')
const precioBox = document.querySelector('.precioBox')
const modeloBox = document.querySelector('.modeloBox')
const imgLink= document.querySelector('.imgLink')
const botonBox= document.querySelector('.botonBox')
const cartConteiner = document.querySelector('.cartConteiner')
const marcaBox = document.querySelector('.marcaBox')
const borrarCarrito = document.querySelector('.borrarCarrito')
const searchBar = document.querySelector('#searchBar')
const searchButton = document.querySelector('#searchButton')




//---Renderizados---


// barra de busqueda.
const searchBarProducto= () => {
    const searchQuery = searchBar.value.toLowerCase()
    console.log('Se ejecuta la busqueda ' + searchQuery);
    const searchResult = productos.filter((producto) => producto.nombre.toLowerCase().includes(searchQuery))
    renderizarProductos(searchResult)
    console.log(searchResult);

}

//prodcutos

const renderizarProductos = (array) => {
    productosContainer.innerHTML = ''
    array.forEach((producto) => {
        const productCard = document.createElement('div')
        productCard.className = 'card'
        productCard.innerHTML = `
            <div class="imgCard">
                <img src=${producto.imagen} alt="">
            </div>    
            <p> ${producto.nombre}  </p>
            <p> ${producto.marca} </p>
            <h6>${producto.modelo} </h6>
            <span>$${producto.precio} </span>
            <button id="botonVer" class="botonVer" data-id="${producto.id}" >ver</button>
         `
        
        productosContainer.append(productCard)

        
    })
    agregarListenerBotonVer ()
}



// Características de prodcuto.

const renderizarBox = (e) => {
    const selectProductId = e.target.getAttribute('data-id')
    const selectProduct = productos.find((producto) => producto.id == selectProductId)

    nameBox.textContent = `${selectProduct.nombre}`
    marcaBox.textContent = `${selectProduct.marca}`
    precioBox.textContent = `$${selectProduct.precio}`
    descBox.textContent = selectProduct.desc
    modeloBox.textContent = selectProduct.modelo
    imgLink.setAttribute('src', selectProduct.imagen)
    botonBox.setAttribute('data-id',selectProduct.id) 

}

// Prodcutos en carrito.



const eliminarProdcuto = (e) => {
    const selectProductId = e.target.getAttribute('data-id')
    carritoProductos = carritoProductos.filter((producto) => producto.id != selectProductId)
    
    renderizarCarrito()
}


const borrarCarrritoAll = () => {
    if (localStorage.getItem('carritoProductos')) {
        localStorage.removeItem('carritoProductos')
    }
    cartConteiner.innerHTML = ''
    carritoProductos = []
}



const renderizarCarrito = () => {
         cartConteiner.innerHTML = '' 
         carritoProductos.forEach((producto) => {
            const itemProductCart = document.createElement('div')
            itemProductCart.className = 'cartItem'
            itemProductCart.innerHTML= ` 
            <div class="imgCart">
            <img src="${producto.imagen} " >
            </div>    
            <p class="nameCart" >${producto.nombre} ${producto.marca} </p>
            <span class="precioCart">$${producto.precio} </span>
            <button data-id="${producto.id}"  class="botonBorrar">borrar</button>`

            cartConteiner.append(itemProductCart)
            

            
    })
    document.querySelectorAll('.botonBorrar').forEach((producto) => {
        producto.addEventListener('click', eliminarProdcuto)

    })

}



   

//--- eventos ---


const agregarProducto = (e) => {
    const selectProductId = e.target.getAttribute('data-id')
    const selectProduct = productos.find((producto) => producto.id == selectProductId)
    if (carritoProductos.length < 4) {
        carritoProductos.push(selectProduct)
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            titleText: 'Producto Agregado',
            text: ';)',
            width: '30%',
            background: '#396afc',
            showConfirmButton: false,
            color: 'white',
            timer: 2000,
            
           
        })
    } else {
        Swal.fire({
            toast: true,
            position: 'center',
            icon: 'error',
            titleText: 'Máximo 4 productos',
            text: ':(',
            width: '30%',
            background: 'black',
            showConfirmButton: false,
            color: 'white',
            timer: 2000,
            
           
        }) 
    }
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos))
    renderizarCarrito() 
   
}

if(localStorage.getItem('carritoProductos')){
    carritoProductos = JSON.parse(localStorage.getItem('carritoProductos'))
    renderizarCarrito()
}




// --- listener botones ---

const agregarListenerBotonVer = () => {
    const botonVer = document.querySelectorAll('.botonVer')
    botonVer.forEach((button) => {
        button.addEventListener('click', renderizarBox)
    })
}


botonBox.addEventListener('click', agregarProducto)

borrarCarrito.addEventListener('click', borrarCarrritoAll)

searchButton.addEventListener('click', searchBarProducto)
//--- Fecth ---


fetch('../data/producto.json')
.then((respuesta) => respuesta.json())
.then((jsonResp) => {
    productos = jsonResp.data
    renderizarProductos(productos)
})  
