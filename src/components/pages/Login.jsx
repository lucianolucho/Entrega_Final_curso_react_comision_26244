import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const manejarLogin = (evento) => {
        evento.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };

    return (
        <div className={styles.contenedorLogin}>
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
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                <h2>Iniciar Sesión</h2>
            </div>

            {/* Formulario */}
            <form onSubmit={manejarLogin} className={styles.formulario}>
                <div className={styles.grupoInput}>
                    <label htmlFor="email" className={styles.label}>
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.grupoInput}>
                    <label htmlFor="password" className={styles.label}>
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(evento) => setPassword(evento.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <button type="submit" className={styles.btnIngresar}>
                    Ingresar
                </button>
                <br />
                <div className={styles.textoFooter}>
                    ¿No estás registrado?
                    <Link to="/registro" className={styles.linkAccion}>
                        Regístrate
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;