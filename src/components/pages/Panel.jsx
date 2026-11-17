import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';


/**/
import FormularioProductoContainer from '../FormularioProducto/FormularioProductoContainer';
import styles from './Panel.module.css';
/**/

const Panel = () => {
  const [productos, setProductos] = useState([]);

  // se usa el diseño brindado por la catedra pero solo se va a msotrar la solapa de "producto"
  const [tabActivo, setTabActivo] = useState('productos');

  // se usará para agregar y editar el producto un dialogo modal
  //El modo del dialogo modal : editar/agregar
  const [productoAEditar, setProductoAEditar] = useState(null);
  //estado que maneja la visibilidad del dialogo modal
  const [modalAbierto, setModalAbierto] = useState(false);



  //levantatodos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // traemos la referencia a la abse
        const productosRef = collection(db, "productos");

        // con la referencia obtenemos los documentos
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
        // Actualizamos el estado local para quitarlo de la lista en la UI
        setProductos(productos.filter((prod) => prod.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };

  // momento en que se dispone del dialogo para agregar producto
  const abrirModalAgregar = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };
  // momento en que se dispone del dialogo para editar producto
  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  // momento en que se dispone del dialogo no visibilizar el dialogo
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

    <div>

      <h2>Panel de Administración</h2>
      {/* Formulario de producto */}
      <FormularioProductoContainer />
      <hr />

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
        <section>
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
                      <td>${prod.precio}</td>
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
          )
          }
        </section>
      )
      }

     {/* Modal provisto por la catedra para editar y agregar productos*/}
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


      {/* Listado de productos */}
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map(prod => (
          <li key={prod.id} style={{ marginBottom: '8px' }}>
            {prod.nombre} - ${prod.precio}
            <button
              onClick={() => eliminarProducto(prod.id)}
              style={{ marginLeft: '10px' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr />


    </div>
  );

};

export default Panel;