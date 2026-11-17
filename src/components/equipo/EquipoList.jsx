import  Equipo  from "./Equipo";

const  EquipoList  = ({ personas }) => {
    return (
        <div style={{ display: 'flex' , justifycontent: 'space-around' , gap: '20px'         }}>
            {personas.map(persona => (
                <Equipo key={persona.id} {...persona} />
            ))}
        </div>
    );
}

export default EquipoList;