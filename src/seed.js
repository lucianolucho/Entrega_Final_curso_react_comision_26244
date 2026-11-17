import db from "./firebase/config.js";

import { collection, addDoc } from "firebase/firestore";
console.log("HOLA MUNDO ")
async function createProducts() {
console.log("HOLA MUNDO 2")
 /* */  try {
        // Leemos el JSON ubicado en public

    //    proyecto_base_04_Entrega_FINAL/proyecto_base_04/public/Datos/productos.json
     //   proyecto_base_04_Entrega_FINAL/proyecto_base_04/src/seed.js
        const respuesta = await fetch("/Datos/productos.json");
        const catalogo = await respuesta.json();

        const productosCollection = collection(db, "productos");

        for (const product of catalogo) {

            await addDoc(productosCollection, product);

        }

        document.getElementById("resultado").textContent =
            "Productos creados exitosamente";

        console.log("Productos creados:", catalogo.length);

    } catch (error) {

        console.error("Error al crear productos:", error);

        document.getElementById("resultado").textContent =
            "Error al cargar productos";

    }/**/
}

createProducts();