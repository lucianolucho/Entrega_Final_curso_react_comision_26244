
import Nav from "./Nav";

import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import { useAuth } from '../context/AuthContext';

const Header = () => {

  const { user, logout } = useAuth();
// alert("ESTOY EN HEADER");
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.brandLogo}>
            Autostore - Autos de colección
          </Link>
        </div>
        <div className={styles.centerSection}>
          <Nav />
        </div>


        <div style={{color: "white"}}>
          <ul>
            {/* Logica de renderizado condicional */}
            {user ? (
              <>
                {/* Mostrar panel SOLO si el usuario es admin */}
                {user.rol === "admin" && (
                  <li>
                    <Link to="/panel" style={{ color: "white" }}>
                      Panel
                    </Link>
                  </li>
                )}
                <span >¡Hola, {user.email}!</span>
                <button onClick={logout}>Cerrar Sesión</button>
              </>
            ) : (
              <li>
                <Link to="/login"  style={{ color: "white" }}>Login</Link>
              </li>
            )}
          </ul>
        </div>

      </header>
    </div>
  )
}

export default Header;