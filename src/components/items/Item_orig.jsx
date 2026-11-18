import { useState } from 'react';
import styles from "./Item.module.css";
import {Link} from 'react-router-dom';     

import { useCarrito } from '../context/CarritoContext';

const Item = ({  id , nombre, precio, stock ,imagen}) => {
    const [cantidad, setCantidad] = useState(0);

     const [producto, setProducto] = useState(null);

// uso el contexto desde el el listado para agreagr al carrito
const { agregarACarrito , incrementarCantidad, decrecrementarCantidad } = useCarrito();

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };
    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }


 const handleAddToCart = () => {
    // Normalizamos los nombres que vienen de la API (title -> nombre, price -> precio)
    const productoFormateado = {
      id: id,
      nombre: nombre,
      precio: precio,
      image: imagen

    };

    agregarACarrito({producto: productoFormateado, cantidad:cantidad});
    alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
  };


    return (
        <div  className={styles.card}  style={{
            border: '1px solid #ccc', padding: '15px', borderRadius:
                '8px', textAlign: 'center'
        }}>
            <img   className={styles.imagen} src={imagen} alt={nombre} />
            <h3>{nombre}</h3>

            < Link  className={styles.detallelink}  to={`/producto/${id}`}>Ver detalle</Link>
            
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent:
                    'center', margin: '10px 0'
            }}>
                <button onClick={decrementar}  >-</button>
                <p style={{ margin: '0 10px' }}>{cantidad}</p>
                <button onClick={incrementar}>++</button>
            </div>
            <button onClick={agregarAlCarrito}>Agregar al Carrito (desde item.jsx)</button>
            <button onClick={handleAddToCart}>Agregar al Carrito (desde item.jsx)</button>
        </div>
    );
}


export default Item;