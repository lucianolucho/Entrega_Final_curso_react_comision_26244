import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import styles from './DetalleProducto.module.css';

import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      setCargando(true);
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("El producto no existe");
        }
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError("Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      image: producto.imagen
    };

    agregarACarrito({ producto: productoFormateado, cantidad: 1 });
    alert(`Agregaste 1 unidad de ${producto.nombre} al carrito.`);
  };

  if (cargando) {
    return <div className={styles.estadoMensaje}>Cargando detalle del producto...</div>;
  }
  
  if (error) {
    return <div className={`${styles.estadoMensaje} ${styles.errorMensaje}`}>Error: {error}</div>;
  }
  
  if (!producto) {
    return <div className={styles.estadoMensaje}>Producto no encontrado</div>;
  }

  return (
    <div className={styles.contenedorDetalle}>
      <div className={styles.cuerpoDetalle}>
        <div className={styles.imagenWrapper}>
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className={styles.imagenProducto} 
          />
        </div>

        <div className={styles.infoProducto}>
          <h2>{producto.nombre}</h2>
          <p className={styles.precio}>AR ${Number(producto.precio).toFixed(2)}</p>
          <p className={styles.stock}>Stock disponible: {producto.stock}</p>

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
      </div>
    </div>
  );
};

export default DetalleProducto;