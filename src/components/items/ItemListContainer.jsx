

import styles from "./ItemListContainer.module.css"
import ItemList from "./ItemList";

import { useState, useEffect } from "react";

const  ItemListContainer = ({ Mensaje })=> {

    const [productos, setProductos] = useState([]);

  /*useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(datos => setProductos(datos))
      .catch(error => console.log(error))
  },[]);
*/
    useEffect(() => {
    fetch('/Datos/productos.json')
      .then(res => res.json())
      .then(datos => setProductos(datos))
      .catch(error => console.log(error))
  },[]);

 
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
