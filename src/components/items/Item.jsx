import { useState } from 'react';
import styles from "./Item.module.css"
import {Link} from 'react-router-dom';     

const Item = ({  id , nombre, precio, stock ,imagen}) => {
    const [cantidad, setCantidad] = useState(0);
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
            <button onClick={agregarAlCarrito}>Agregar al Carrito</button>
        </div>
    );
}


export default Item;