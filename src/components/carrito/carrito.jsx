import { useCarrito } from '../context/CarritoContext';
import styles from './Carrito.module.css';
import { Link } from 'react-router-dom';

const Carrito = () => {
    const { 
        carrito, 
        vaciarCarrito, 
        eliminarDelCarrito, 
        incrementarCantidad, 
        decrementarCantidad, 
        cobroTotal 
    } = useCarrito();

    if (carrito.length === 0) {
        return (
            <div className={styles.carritoVacio}>
                <h1>El carrito está vacío</h1>
                <p>Agrega productos para continuar la compra.</p>
            </div>
        );
    }

    return (
        <div className={styles.contenedorCarrito}>
            {/* Encabezado Azul */}
            <header className={styles.header}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <h1>Carrito de Compras</h1>
            </header>

            {/* Lista de Productos */}
            <div className={styles.listaProductos}>
                {carrito.map(item => (
                    <div key={item.producto.id} className={styles.carritoItem}>
                        <div className={styles.imagenWrapper}>
                            <img 
                                src={item.producto.image || item.image} 
                                alt={item.producto.nombre} 
                                className={styles.imagenProducto}
                            />
                        </div>

                        <div className={styles.detalleProducto}>
                            <h4>{item.producto.nombre}</h4>
                            <p>Cantidad: {item.cantidad}</p>
                            <p>Precio unitario: ${Number(item.producto.precio).toFixed(2)}</p>
                            <p>Subtotal: ${(item.producto.precio * item.cantidad).toFixed(2)}</p>
                        </div>

                        {/* Controles de cantidad y botón eliminar */}
                        <div className={styles.accionesItem}>
                            <div className={styles.controlesCantidad}>
                                <button onClick={() => decrementarCantidad(item.producto.id)}>-</button>
                                <span>{item.cantidad}</span>
                                <button onClick={() => incrementarCantidad(item.producto.id)}>+</button>
                            </div>

                            <button 
                                onClick={() => eliminarDelCarrito(item.producto.id)}
                                title="Eliminar producto"
                                className={styles.botonEliminar}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="22" 
                                    height="22" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor"
                                >
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    </div>                
                ))}
            </div>

            {/* Footer con Total y Botones de Acción */}
            <footer className={styles.footerCarrito}>
                <h3 className={styles.totalTexto}>
                    Total a pagar: <span className={styles.totalMonto}>${cobroTotal().toFixed(2)}</span>
                </h3>

                <div className={styles.botonesFooter}>
                    <button onClick={vaciarCarrito} className={styles.btnVaciar}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Vaciar Carrito
                    </button>
                
                    <Link 
                        to="/" 
                        onClick={() => alert("Gracias por comprar")} 
                        className={styles.btnFinalizar}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Finalizar Compra
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Carrito;