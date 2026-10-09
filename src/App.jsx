import './App.css'

import Layout from './components/layout/Layout';
import ItemListContainer from './components/items/ItemListContainer';

import FormularioProductoContainer from './components/FormularioProducto/FormularioProductoContainer,';
import DetalleProducto from './components/FormularioProducto/DetalleProducto';


// capitulo 7
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"} />} />
        <Route path="/producto/:id" element={<DetalleProducto Mensaje={"Productos destacados"} />} />
        <Route path="/carrito" element={<h1>carrito...</h1>} />

        <Route path="/destacados" element={<ItemListContainer Mensaje={"Todos los productos"} />} />
        <Route path="/alta" element={<FormularioProductoContainer />} />  
      </Route>
    </Routes>);
}
export default App;
