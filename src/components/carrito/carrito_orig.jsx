
import { useCarrito } from '../context/CarritoContext';
import styles from './Carrito.module.css';



import { Link } from 'react-router-dom';

const Carrito = () => {

    const { carrito ,vaciarCarrito,eliminarDelCarrito,incrementarCantidad,decrementarCantidad,cobroTotal} = useCarrito();

    console.log("cantidad de items", carrito.length);
    console.log("carrito", carrito);

    if (carrito.length === 0) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Carrito de Compras</h1>

            {carrito.map(item => (
                <div key={item.producto.id}  className={styles.carritoItem}>
                    <img src={item.producto.image || item.image} alt={item.producto.nombre} width="60" />
                   <div  className={styles.detalleProducto}>
                        <h4>{item.producto.nombre}</h4>
                        <p>Cantidad: {item.cantidad}</p>
                        <p>Precio unitario: ${item.producto.precio}</p>
                        <p>Subtotal: ${item.producto.precio * item.cantidad}</p>
                    </div>
                {/* Controles de cantidad (+ / -) */}
                    <div className={styles.controlesCantidad}>
                        <button onClick={() => decrementarCantidad(item.producto.id)}>-</button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => incrementarCantidad(item.producto.id)}>+</button>
                    </div>

                  {/* Botón con icono de papelera */}
                  <button 
                        onClick={() => eliminarDelCarrito(item.producto.id)}
                        title="Eliminar producto"
                      className={styles.botonEliminar}
                    >  <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>

                    <hr />
                </div>                
            ))}

        
            <hr />

            <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>
            <button onClick={vaciarCarrito} className="btn-vaciar">Vaciar Carrito</button>
        
            <Link to="/" onClick={()=>alert("Gracias por comprar")}className="btn-finalizar"> Finalizar Compra
           </Link>
        </div>
    );
};

export default Carrito;
