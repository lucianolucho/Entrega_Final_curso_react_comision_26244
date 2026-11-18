import styles from './FormularioProducto.module.css';

export function FormularioProducto({ 
    datosForm, 
    manejarCambio, 
    manejarEnvio, 
    manejarCambioImagen, 
    cargando,
    esEdicion,
    errores = {} 
}) {

    return (
        <form className={styles.formulario} onSubmit={manejarEnvio}>
            
            {/* Campo Nombre */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Nombre del Producto:</label>
                <input 
                    type="text"
                    name="nombre"
                    value={datosForm.nombre || ""}
                    onChange={manejarCambio}
                    placeholder="Ej: Teclado Mecánico" 
                    className={styles.input}
                />
                {errores.nombre && <span className={styles.errorTexto}>{errores.nombre}</span>}                     
            </div>

            {/* Campo Descripción */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={datosForm.descripcion || ""}
                    onChange={manejarCambio}
                    placeholder="Detalles del producto..."
                    className={styles.textarea}
                />
                {errores.descripcion && <span className={styles.errorTexto}>{errores.descripcion}</span>}
            </div>

            {/* Campo Categoría */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Categoría:</label>
                <select
                    name="categoria"
                    value={datosForm.categoria || ""}
                    onChange={manejarCambio}
                    className={styles.select}
                >
                    <option value="" disabled>Selecciona categoría</option>
                    <option value="clasicos">Clásicos</option>
                    <option value="deportivos">Deportivos</option>
                    <option value="superdeportivos">Superdeportivos</option>
                </select>
                {errores.categoria && <span className={styles.errorTexto}>{errores.categoria}</span>}
            </div>

            {/* Campo Precio */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Precio:</label>
                <input 
                    type="number"
                    name="precio"
                    value={datosForm.precio || ""}
                    onChange={manejarCambio}
                    placeholder="Ej: 95" 
                    className={styles.input}
                    step="0.01"
                />
                {errores.precio && <span className={styles.errorTexto}>{errores.precio}</span>}
            </div>

            {/* Campo Stock */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Stock:</label>
                <input 
                    type="number"
                    name="stock"
                    value={datosForm.stock || ""}
                    onChange={manejarCambio}
                    placeholder="Ej: 5" 
                    className={styles.input}
                />
                {errores.stock && <span className={styles.errorTexto}>{errores.stock}</span>}
            </div>

            {/* Campo Imagen (Quitamos el value para evitar advertencias en inputs type="file") */}
            <div className={styles.grupoInput}>
                <label className={styles.label}>Imagen:</label>
                <input 
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                    className={styles.input}
                />
                {errores.imagen && <span className={styles.errorTexto}>{errores.imagen}</span>}
            </div>

            {/* Botón único inteligente unificado */}
            <button 
                type="submit" 
                disabled={cargando}
                className={styles.btnSubmit}
            >
                {cargando
                  ? "Procesando..."
                  : esEdicion
                  ? "Guardar Cambios"
                  : "Crear Producto"}
            </button>
        </form>
    );
}

export default FormularioProducto;