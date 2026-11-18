import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import FormularioProductoContainer from '../FormularioProducto/FormularioProductoContainer';
import styles from './Panel.module.css';

const Panel = () => {
  const [productos, setProductos] = useState([]);
  const [tabActivo, setTabActivo] = useState('productos');
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Levantar todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);

        setProductos(
          resp.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);
        await deleteDoc(docRef);
        setProductos(productos.filter((prod) => prod.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };

  const abrirModalAgregar = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setProductoAEditar(null);
    setModalAbierto(false);
  };

  const handleProductoGuardado = (productoGuardado, esEdicion) => {
    if (esEdicion) {
      setProductos(previos => previos.map(p => p.id === productoGuardado.id ? productoGuardado : p));
    } else {
      setProductos(previos => [...previos, productoGuardado]);
    }
    cerrarModal();
  };

  return (
    <div className={styles.contenedorPanel}>
      {/* Cabecera del Panel */}
      <div className={styles.headerPanel}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <h2>Panel de Administración</h2>
      </div>

      {/* PESTAÑAS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tabActivo === 'productos' ? styles.activeTab : ''}`}
          onClick={() => setTabActivo('productos')}
        >
          Productos
        </button>
      </div>

      {tabActivo === 'productos' && (
        <div className={styles.seccionContenido}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Listado de Productos</h3>
            <button className={styles.btnPrimary} onClick={abrirModalAgregar}>
              <span>+</span> Agregar Producto
            </button>
          </div>

          {productos.length === 0 ? (
            <p className={styles.emptyText}>No hay productos cargados todavía.</p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th style={{ textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(prod => (
                    <tr key={prod.id}>
                      <td>
                        <img
                          src={prod.imagen || 'https://via.placeholder.com/50'}
                          alt={prod.nombre}
                          className={styles.productImg}
                        />
                      </td>
                      <td><strong>{prod.nombre}</strong></td>
                      <td>{prod.categoria || '-'}</td>
                      <td>${Number(prod.precio).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className={styles.btnOutline}
                          onClick={() => abrirModalEditar(prod)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.btnDanger}
                          onClick={() => eliminarProducto(prod.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal para editar y agregar productos */}
      {modalAbierto && (
        <div className={styles.modalOverlay} onClick={cerrarModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.sectionTitle}>
                {productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <button className={styles.btnClose} onClick={cerrarModal}>✕</button>
            </div>

            <FormularioProductoContainer 
              productoAEditar={productoAEditar} 
              setProductoAEditar={setProductoAEditar}
              onProductoAgregado={(producto, esEdicion) => handleProductoGuardado(producto, esEdicion)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Panel;