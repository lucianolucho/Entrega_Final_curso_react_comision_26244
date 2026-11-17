import { useState, useEffect } from "react";
import FormularioProducto from './FormularioProducto';

import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';


const estadoInicial = {
    nombre: '',
    precio: '',
    stock: '',
    categoria: "",
    descripcion: ""
    // Quitamos la urlImagen de aca porque la obtendremos después de la subida

};

const FormularioProductoContainer = ({ productoAEditar, onProductoAgregado }) => {


    const [datosForm, setDatosForm] = useState(estadoInicial);

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);

    const [cargando, setCargando] = useState(false);

    const [errores, setErrores] = useState({});



    useEffect(() => {
        if (productoAEditar) {
           setDatosForm(productoAEditar);
        } else {
            setDatosForm(estadoInicial);
        }
        setErrores({});
    }, [productoAEditar]);

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

    const subirImagenImgbb = async (imagenFile) => {
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
                /*const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    urlImagen: datosImgbb.data.url
                };*/
                return datosImgbb.data.url

            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }

    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        console.log('Enviando los siguientes datos a la API:', datosForm);

        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }
        if (!validarFormulario()) return;
        setCargando(true);

        try {
            let urlImagen = datosForm.imagenFile || "";

            if (imagenFile) {
                urlImagen = await subirImagenImgbb(imagenFile);
            }
            const productoCompleto = {
                ...datosForm,
                // Agregamos la URL obtenida
                imagen: urlImagen
            };

            if (productoAEditar) {
                const docRef = doc(db, "productos", productoAEditar.id);
                await updateDoc(docRef, productoCompleto);

                alert("¡Producto actualizado con éxito!");

                if (onProductoAgregado) {
                    onProductoAgregado({ id: productoCompleto.id, ...productoCompleto }, true);
                }
            } else {
                const docRef = await addDoc(collection(db, "productos"), productoCompleto);

                alert("¡Producto guardado con éxito!");

                if (onProductoAgregado) {
                    onProductoAgregado({ id: docRef.id, ...productoCompleto }, false);
                }
            }
            setDatosForm(estadoInicial);
            setImagenFile(null);

        } catch (error) {
            console.error("Error en el envío:", error);
            alert("Hubo un error al procesar la operación.");

        } finally {
            setCargando(false);

        }


        /*  // ¡Reemplazá esto con tu clave!
          const apiKey = "8c0083085b76bb95a5315b7a7baca1a5";
          // --- Lógica para subir la imagen a Imgbb ---
          const formData = new FormData();
          formData.append('image', imagenFile);
  
  */
        /* * /try {
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
 
                  // --- Logica para subir datos a Firestore ---
                 console.log('Enviando producto a Firebase:', productoCompleto);
                 const productosCollection = collection(db, "productos");
                 await addDoc(productosCollection, productoCompleto);
 
 
                 // Por el momento hacemos un console.log
                 console.log('Enviando los siguientes datos COMPLETOS a la API:', productoCompleto);
             } else {
                 throw new Error('La subida de la imagen a Imgbb falló.');
             }
         } catch (error) {
             console.error("Error en el proceso de envío:", error);
             alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
         }*/

    };

    const validarFormulario = () => {
        const nuevosErrores = {};

      if (!datosForm.nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede quedar vacío.";
    }

    if (!datosForm.precio) {
      nuevosErrores.precio = "El precio no puede quedar vacío.";
    } else if (Number(datosForm.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (datosForm.stock === "" || datosForm.stock === undefined) {
      nuevosErrores.stock = "El stock no puede quedar vacío.";
    } else if (Number(datosForm.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser un número negativo.";
    }

    if (!datosForm.categoria) {
      nuevosErrores.categoria = "Por favor selecciona una categoría.";
    }

    if (!datosForm.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es requerida.";
    }

    // La imagen es requerida solo al crear
    if (!productoAEditar && !imagenFile) {
      nuevosErrores.imagen = "Debes seleccionar una imagen para el nuevo producto.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
    };


    return ( // se pasan como props
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            // Pasamos la nueva función como prop
            manejarCambioImagen={manejarCambioImagen}
            cargando={cargando}
            esEdicion={!!productoAEditar}
            errores={errores}
      
        />
    );
}
export default FormularioProductoContainer;
