import styles from "./Footer_3.module.css"; 
import EquipoListContainer from '../../components/equipo/EquipoListContainer';

const Footer_3 = () => {
  return (
    <footer className={styles.footer}>
        
      {/* Ojo: Si EquipoListContainer no pertenece al footer, te sugiero sacarlo de aquí y ponerlo en la página principal */}
      <EquipoListContainer />

      <div className={styles.footerContainer}>

        <div className={styles.footerSection}>
          <h3>AutoStore</h3>
          <p>
            Venta de autos y productos para coleccionistas.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Información</h3>
          <ul>
            <li><a href="#">Propiedad intelectual</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Términos y condiciones</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contacto</h3>
          <p>Email: contacto@autostore.com</p>
          <p>Teléfono: 2494-123456</p>
          <p>Tandil, Buenos Aires</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Sucursales</h3>
          <ul>
            <li>Tandil - Centro</li>
            <li>Buenos Aires - Palermo</li>
            <li>Mar del Plata - Centro</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Newsletter</h3>
          <p>Recibí novedades y promociones.</p>

          <input
            type="email"
            placeholder="Tu email"
            className={styles.newsletterInput}
          />

          <button className={styles.newsletterBtn}>Suscribirme</button>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 AutoStore - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer_3;