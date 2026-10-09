

/* 
datosForm: Un objeto que contiene los valores actuales de todos los campos del
formulario (nombre, precio, stock, etc.). Lo usaremos para poblar el atributo value de
cada input.
manejarCambio: Una función que se ejecutará cada vez que el usuario escriba en
un input. La conectaremos al evento onChange.
manejarEnvio: Una función que se ejecutará cuando el usuario envíe el formulario.
La conectaremos al evento onSubmit de la etiqueta <form>.


*/

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio ,manejarCambioImagen}) {
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };
    return (
        <form style={formStyle}  onSubmit={manejarEnvio} >
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input type="text"
                    name="nombre" // Atributo clave para identificar el input
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    placeholder="Ej: Teclado Mecánico" />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number"
                    name="precio" // Atributo clave para identificar el input
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    placeholder="Ej: 95" />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number"
                    name="stock" // Atributo clave para identificar el input
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    placeholder="Ej: 5" />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file"
                    name="imagen" // Atributo clave para identificar el input
                    value={datosForm.urlImagen}
                    onChange={manejarCambioImagen}
                    placeholder="https://..." />
            </div>
            <button type="submit"  >Guardar Producto</button>
        </form>
    );
}

export default FormularioProducto;