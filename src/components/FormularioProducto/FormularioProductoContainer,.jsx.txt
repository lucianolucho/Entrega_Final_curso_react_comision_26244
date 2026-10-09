import { useState} from "react";
import FormularioProducto from './FormularioProducto';

const FrommularioProductoContainer = () => {


    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''
        // Quitamos la urlImagen de aca porque la obtendremos después de la subida
    });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);


/*
evento es simplemente el parámetro que recibe la función.
¿De dónde sale?
Sale del evento que genera el elemento HTML cuando ocurre el onChange.
target es el elemento que generó el evento,
*/

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatosForm({
          //   ...datosForm, [evento.target.name]: evento.target.value
          ...datosForm, [name]: value
        });
        console.log('el cambio', datosForm);
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        console.log('Enviando los siguientes datos a la API:', datosForm);

        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        // ¡Reemplazá esto con tu clave!
        const apiKey = "8c0083085b76bb95a5315b7a7baca1a5";
        // --- Lógica para subir la imagen a Imgbb ---
        const formData = new FormData();
        formData.append('image', imagenFile);


        try {
            console.log("Subiendo imagen a Imgbb...");

            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });

            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);
                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    urlImagen: datosImgbb.data.url
                };
                // Por el momento hacemos un console.log
                console.log('Enviando los siguientes datos COMPLETOS a la API:', productoCompleto);
            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }

 };
    return ( // se pasan como props
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            // Pasamos la nueva función como prop
            manejarCambioImagen={manejarCambioImagen}
        />
    );
}
    export default FrommularioProductoContainer;
