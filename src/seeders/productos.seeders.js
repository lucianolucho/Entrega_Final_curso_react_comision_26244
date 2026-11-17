import db from "../firebase/config.js";


// importa la función collection y addDoc de firebase/firestore
//  para interactuar con la base de datos Firestore. Luego, 
// se define una colección llamada "productos" y se crea un arreglo de objetos llamado "catalogo" 
// que contiene los productos a insertar en la base de datos.
//  La función createProducts recorre el arreglo catalogo y utiliza addDoc para 
// agregar cada producto a la colección "productos". Finalmente, se llama a createProducts para
//  ejecutar el proceso de inserción.  
 

/**/
import {collection, addDoc } from "firebase/firestore";

import productos from "../../public/Datos/productos.json";

const catalogo = productos;

const productosCollection = collection(db, "productos");

const createProducts = async () => {
    try {
        catalogo.forEach(async (product) => {
            await addDoc(productosCollection, product);
        });
        console.log("Productos creados exitosamente");
    } catch (error) {
        console.error("Error al crear productos: ", error);
    }
};

createProducts();

/**/


//const { initializeApp, cert } = require("firebase-admin/app");
//const { getFirestore } = require("firebase-admin/firestore");

// Credenciales privadas
//const serviceAccount = require("../serviceAccountKey.json");

// Nuestro archivo JSON de productos

