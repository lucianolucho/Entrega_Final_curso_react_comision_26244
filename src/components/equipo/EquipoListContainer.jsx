

import styles from "./EquipoListContainer.module.css"
import EquipoList from "./EquipoList";


const  EquipoListContainer = ({ Mensaje })=> {
    const personas = [
        { id: '1234', nombre: 'Buzz Lightyear', puesto: 'Desarrollador', foto: '/Datos/images.jpeg' },
        { id: '2344', nombre: 'Woody', puesto: 'Diseñador', foto: '/Datos/images3.jpeg' },
        { id: '2545', nombre: 'Jessie', puesto: 'Tester', foto: '/Datos/images_2.jpeg' }];
    return (
        <div>
            <h2>{Mensaje}</h2>
            <div  className={styles.personas} >
                <EquipoList personas={personas} />
            </div>
        </div>
    );
}

export default EquipoListContainer;