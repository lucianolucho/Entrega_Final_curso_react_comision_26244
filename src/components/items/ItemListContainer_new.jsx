import styles from "./ItemListContainer.module.css";
import ItemList from "./ItemList";
import { useState, useEffect } from "react";

// Los import para conectarme con la nube 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const ItemListContainer = ({ Mensaje }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
 
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosRef = collection(db, "productos");
                const resp = await getDocs(productosRef);
         
                const listaProductos = resp.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                
                setProductos(listaProductos);
            } catch (error) {
                console.error("Error al obtener productos de Firestore:", error);
            } finally {
                setCargando(false);
            }
        };
 
        obtenerProductos();
    }, []);

    if (cargando) {
        return <div className={styles.estadoMensaje}>Cargando productos...</div>;
    }
 
    return (
        <div className={styles.contenedor}>
            <h2 className={styles.titulo}>{Mensaje}</h2>
            <div className={styles.productos}>
                <ItemList productos={productos} />
            </div>
        </div>
    );
};

export default ItemListContainer;