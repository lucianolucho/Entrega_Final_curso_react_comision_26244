import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Registro.module.css';

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError(null); // Reseteamos cualquier error previo
    try {
      // Intentamos crear el nuevo usuario en Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Si la creación es exitosa, lo redirigimos al inicio
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );

        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };
  
  return (
    <div className={styles.contenedorRegistro}>
      {/* Cabecera interna */}
      <div className={styles.header}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
        <h2>Crear una nueva cuenta</h2>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.grupoInput}>
          <label className={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            className={styles.input}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className={styles.grupoInput}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            className={styles.input}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.btnRegistrar}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;