import { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';


const  DetalleProducto =()=> {
  const { id } = useParams();
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
          (producto) => producto.id === Number(id)
        );
        if (!productoEncontrado) {
          throw new Error('No se encontró el producto');
        }
        setProducto(productoEncontrado);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);



  if (cargando) return <p>Cargando detalle del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="producto-detalle">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} width="300" />
      <p><strong></strong> {producto.nombre}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Precio:</strong> AR${producto.precio}</p>
    </div>
  );
}   

export default DetalleProducto;