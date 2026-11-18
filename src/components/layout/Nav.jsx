
import { Link } from 'react-router-dom';

import styles from './Nav.module.css';

import { useCarrito } from '../context/CarritoContext.jsx';

const Nav = () => {

  const { itemsEnCarrito } = useCarrito();

  const CantidadItemsEnCarrito = itemsEnCarrito();

  return (
  <nav >
      <ul className={styles.menu} >
        <li>
          <Link to="/" >
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" >
            Productos
          </Link>
        </li>
        <li>
          <Link to="/#contacto" >
            Contacto
          </Link>
        </li>
        <li>
          <Link to="/panel" className={styles.navLink}>
             Panel Administrativo
          </Link>
                  
        </li> 

        <li>
          <Link to="/carrito" >
            Carrito  🛒 {CantidadItemsEnCarrito > 0 &&
            <span>{CantidadItemsEnCarrito}</span>}
          </Link>
        </li>
      </ul>
    </nav>

  )
}

export default Nav;