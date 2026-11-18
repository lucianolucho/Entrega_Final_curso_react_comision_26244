import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useCarrito } from '../context/CarritoContext';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { doc, getDoc } from 'firebase/firestore';

const DetalleProducto = () => {
  const { id } = useParams();

  const { agregarACarrito } = useCarrito();



  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Fetch que se ejecuta cada vez que cambie el ID
  /* useEffect(() => {
   //setCargando(true);
   // fetch(`https://fakestoreapi.com/products/${id}`)
   fetch('/Datos/productos.json/${id}')
     .then((res) => {
       if (!res.ok) throw new Error('No se encontró el producto');
       return res.json();
     })
     .then((datos) => setProducto(datos))
     .catch((err) => setError(err.message))
     .finally(() => setCargando(false));
 }, [id]);

*/



  const handleAddToCart = () => {
    // Normalizamos los nombres que vienen de la API (title -> nombre, price -> precio)
    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      image: producto.imagen

    };

    agregarACarrito({producto: productoFormateado, cantidad:1});
    alert(`Agregaste ${1} unidades de ${producto.nombre} al carrito.`);
  };

/** / 
//obtener productor con el json local
  useEffect(() => {
    fetch('/Datos/productos.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el archivo');
        }
        return res.json();
      })
      .then((datos) => {
        const productoEncontrado = datos.find(
         // para json local
         // (producto) => producto.id === Number(id)
          (producto) => producto.id === id
        );
        if (!productoEncontrado) {
          throw new Error('No se encontró el producto');
        }
        setProducto(productoEncontrado);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);
/ **/

/*
useEffect(() => {
    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se encontró el producto');
        return res.json();
      })
      .then(datos => setProducto(datos))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);
/ **/

  /** / 
   useEffect(()=> {
    const obtenerProducto = async () => {

    setCargando(true);

    try {

        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) {
            throw new Error("No se encontró el producto");
        }

        const datos = await res.json();

        setProducto(datos);

    } catch (err) {

        setError(err.message);

    } finally {

        setCargando(false);

    }


    
};
obtenerProducto();
},[id]);

/ **/

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


  if (cargando) return <p>Cargando detalle del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  /* Lógica del Carrito
     Traemos la función del contexto
   */


  return (
    <div className="producto-detalle">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} width="300" />
      <p><strong></strong> {producto.nombre}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Precio:</strong> AR${producto.precio}</p>


      <button onClick={handleAddToCart}>
        Agregar al carrito(desde detalle de producto)
      </button>

    </div>
  );
}

export default DetalleProducto;