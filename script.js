console.log("starting script.js")

// Async / Await --> Modern way of handling async code. Async: Asynchronous code. Await: Wait for the async code to finish.

const urlProducts = 'https://6275796715458100a6a41626.mockapi.io/api/products'
const fetchData = async () => {
    console.log("fetching data...")
    const response = await fetch(urlProducts)
    console.log({ response }) // Obtuvimos la respuesta del servidor con instancia de Response igual que con fetch(then) pero con async y await

    const data = await response.json()
    console.log({ data }) // Ahora quiero ver los productos que se obtienen de ese endpoint

    return data
}

fetchData() // ✔️



const submitForm = document.getElementById('submitForm')
const productTitle = document.getElementById('productTitle')
const productDescription = document.getElementById('productDescription')
const productPrice = document.getElementById('productPrice')

submitForm.addEventListener('submit', async (event) => {
    event.preventDefault() // evitamos la recarga de la página por defecto

    const title = productTitle.value
    const description = productDescription.value
    const price = parseInt(productPrice.value)

    console.log("Respuesta de los inputs", {
        title,
        description,
        price

    })

    const newProduct = {
        productTitle: title,
        productDescription: description,
        productPrice: price
    }

    console.log("El objeto que vamos a enviar al endpoint", newProduct)

    console.log("Qué me devuelve JSON.stringify", JSON.stringify(newProduct))
    // Ahora hacemos la petición para CREAR un nuevo producto apuntando al endpoint con un verbo HTTP POST

    // try-catch // Esto nos permite intentar (try) hacer algo y si falla, capturar el error (catch)
    try {
        const response = await fetch(urlProducts, {
            // Metodo que quiero usar a través de la clave method
            method: 'POST',
            // Decirle al servidor que contenido le quiero enviar a través de la clave body
            body: JSON.stringify(newProduct),
            // Decirle al servidor que tipo de contenido le estoy enviando a través de la clave headers
            headers: {
                'Content-Type': 'application/json' // Content-Type es un tipo de header que le dice al servidor qué tipo de contenido le estoy enviando
            }
        })

        console.log({ response })

        const data = await response.json()
        console.log({ data })

    } catch (error) {
        console.error("Error al enviar el producto", error)
    }

})