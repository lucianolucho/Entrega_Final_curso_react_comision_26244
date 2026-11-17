import EquipoListContainer from '../../components/equipo/EquipoListContainer';


 const     Footer_2 = () => {
    return (
        <h2 style={{
            backgroundColor: "#9fcc8a", padding: "10px",
            textAlign: "center", marginTop: "20px", color: "black"
        }}>

    <EquipoListContainer />
    
            <p>&copy; 2026 - Mi Aplicación React</p>
        </h2>
    );
}
export default Footer_2;