
import { Link } from 'react-router-dom';

import styles from './Nav.module.css';

const Nav = () => {
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
          <Link to="/" >
            Contacto
          </Link>
        </li>
        <li>
          <Link to="/carrito" >
            Carrito
          </Link>
        </li>
      </ul>
    </nav>

  )
}

export default Nav;