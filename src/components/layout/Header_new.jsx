import Nav from "./Nav";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        
        {/* Marca de la Tienda */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.brandLogo}>
            AutoStore 🏎️
          </Link>
        </div>

        {/* Navegación Principal */}
        <div className={styles.centerSection}>
          <Nav />
        </div>

        {/* Sección de Autenticación / Usuario */}
        <div className={styles.authSection}>
          <ul className={styles.authList}>
            {user ? (
              <>
                {/* Mostrar panel SOLO si el usuario es admin */}
                {user.rol === "admin" && (
                  <li>
                    <Link to="/panel" className={`${styles.authLink} ${styles.adminLink}`}>
                      Panel Admin
                    </Link>
                  </li>
                )}
                <span className={styles.userGreeting}>¡Hola, {user.email}!</span>
                <li>
                  <button onClick={logout} className={styles.btnLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={styles.authLink}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

      </header>
    </div>
  );
};

export default Header;