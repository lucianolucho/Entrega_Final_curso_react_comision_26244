

import styles from "./ItemListContainer.module.css"
import ItemList from "./ItemList";

import { useState, useEffect } from "react";

// los import para conectarme con la nube 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";


const  ItemListContainer = ({ Mensaje })=> {

    const [productos, setProductos] = useState([]);

  /*useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(datos => setProductos(datos))
      .catch(error => console.log(error))
  },[]);
*/

//cargo los productos desde un archivo local
/*    useEffect(() => {
    fetch('/Datos/productos.json')
      .then(res => res.json())
      .then(datos => setProductos(datos))
      .catch(error => console.log(error))
  },[]);
*/

 //cargo los porductos desde forebase/firestore
 const [cargando, setCargando] = useState(true);
 
 useEffect(()=> {
    const obtenerProductos = async()=>{
      
      try{
        const productosRef = collection(db,"productos");
        const resp = await getDocs(productosRef);
         
        const listaProductos = resp.docs.map(doc => ({...doc.data(),id:doc.id}

        )

        );
        setProductos(listaProductos);
    }catch(error){
        console.error("Error al obtener productos de Firestore:", error);

    }finally{
        setCargando(false);
    }

    }
 
    obtenerProductos();
 }
 ,[]);

 if (cargando) return <p>Cargando productos...</p>;
 
  return (
        <div>
            <h2>{Mensaje}</h2>
            <div  className={styles.productos} >
                <ItemList productos={productos} />
            </div>
        </div>
    );
}

export default ItemListContainer;
