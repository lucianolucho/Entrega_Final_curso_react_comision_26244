import './App.css'

import Layout from './components/layout/Layout';
import ItemListContainer from './components/items/ItemListContainer';

import FormularioProductoContainer from './components/FormularioProducto/FormularioProductoContainer';
import DetalleProducto from './components/FormularioProducto/DetalleProducto';
import Carrito from './components/carrito/carrito';

import Panel from "./components/pages/Panel";

import Login from "./components/pages/Login";
import Registro from "./components/pages/Registro";
import RutaProtegida from "./components/RutaProtegida/RutaProtegida";

// capitulo 7
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Productos destacados"} />} />
        <Route path="/producto/:id" element={<DetalleProducto Mensaje={"Productos destacados"} />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/destacados" element={<ItemListContainer Mensaje={"Todos los productos"} />} />
        <Route path="/alta" element={<FormularioProductoContainer />} />

        

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
         <Route
            path="/panel"
            element={
              <RutaProtegida rolesPermitidos={['admin']}>
                <Panel />
              </RutaProtegida>
            }
            />

      </Route>
    </Routes>);
}
export default App;
