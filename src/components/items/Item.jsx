import { useState } from 'react';
import styles from "./Item.module.css";
import { Link } from 'react-router-dom';     
import { useCarrito } from '../context/CarritoContext';

const Item = ({ id, nombre, precio, stock, imagen }) => {
    const [cantidad, setCantidad] = useState(0);

    // Uso el contexto desde el listado para agregar al carrito
    const { agregarACarrito } = useCarrito();

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

    const handleAddToCart = () => {
        if (cantidad === 0) {
            alert("Por favor selecciona al menos una unidad.");
            return;
        }

        const productoFormateado = {
            id: id,
            nombre: nombre,
            precio: precio,
            image: imagen
        };

        agregarACarrito({ producto: productoFormateado, cantidad: cantidad });
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        
        // Opcional: reiniciar contador tras agregar
        setCantidad(0);
    };

    return (
        <div className={styles.card}>
            <div className={styles.imagenWrapper}>
                <img className={styles.imagen} src={imagen} alt={nombre} />
            </div>

            <h3>{nombre}</h3>

            <Link className={styles.detallelink} to={`/producto/${id}`}>
                Ver detalle
            </Link>
            
            <p className={styles.precio}>${Number(precio).toFixed(2)}</p>
            <p className={styles.stock}>Stock disponible: {stock}</p>

            {/* Selector de cantidad idéntico al carrito */}
            <div className={styles.controlesCantidad}>
                <button onClick={decrementar}>-</button>
                <p className={styles.contadorValor}>{cantidad}</p>
                <button onClick={incrementar}>+</button>
            </div>

            <button onClick={handleAddToCart} className={styles.btnAgregar}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                Agregar al Carrito
            </button>
        </div>
    );
};

export default Item;