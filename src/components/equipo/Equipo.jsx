
// import { useState } from 'react';


const equipo = ({ nombre, puesto, foto }) => {


    return (
        <div style={{
            border: '1px solid #ccc', padding: '15px', borderRadius:
                '8px', textAlign: 'center', borderColor: "black"
        }}>
            <img src={foto} alt={nombre} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h3>{nombre}</h3>
            <p>{puesto}</p>
        </div>
    );


}

export default equipo;  