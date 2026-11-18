import { Link } from 'react-router-dom';

import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            
            {/* 1. Banner Principal (Hero) */}
            <div className={styles.heroBanner}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Pasión en escala: coleccioná tus modelos favoritos</h1>
                    <p className={styles.heroSubtitle}>
                        Descubrí piezas únicas, clásicos inolvidables y ediciones especiales para llevar tu colección al siguiente nivel.
                    </p>
                    <Link to="/productos" className={styles.btnHero}>
                        Ver Catálogo
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>

            {/* 2. Sección de Beneficios / Características */}
            <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                    </div>
                    <h3 className={styles.featureTitle}>Envíos con Cuidado Extremo</h3>
                    <p className={styles.featureText}>Empacamos cada modelo de forma segura para que llegue intacto a tu repisa.</p>
                </div>

                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </div>
                    <h3 className={styles.featureTitle}>Modelos Exclusivos</h3>
                    <p className={styles.featureText}>Variedad de escalas, marcas y ediciones limitadas para verdaderos coleccionistas.</p>
                </div>

                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    </div>
                    <h3 className={styles.featureTitle}>Pagos Seguros</h3>
                    <p className={styles.featureText}>Comprá con tranquilidad mediante múltiples medios de pago oficiales.</p>
                </div>
            </div>


        </div>
    );
};

export default Home;