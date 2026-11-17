import { useState, useContext, createContext } from 'react';


/**
useState → para guardar y actualizar el carrito.
useContext → para poder consumir el contexto desde los componentes.
createContext → para crear el contexto
 */

//Creación del contexto
export const CarritoContext = createContext();


//Custom Hook useCart
//En lugar de escribir useContext(CartContext) cada vez, simplemente usaremos useCarrito().
export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
    }
    return context;
};


//proveedor
/*
CarritoProvider es un componente especial que envolverá a toda tu app.
Dentro, usamos un useState([]) → el carrito arranca vacío.
*/

/*
export const CarritoProvider = (props) => {
    const children = props.children;
*/
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    /*
    const carrito = [
  { id: 1, nombre: "Ferrari", precio: 1000, cantidad: 2 },
  { id: 2, nombre: "Ford", precio: 800, cantidad: 1 }
        ];
    */

    //Estamos creando una variable que contiene una función.
    /*  function agregarACarrito(datos) {
       // ...
       }*/
    // la forma de declarar es con una desestructuración
    const agregarACarrito = ({ producto, cantidad = 1 }) => {

        

       // console.log("agregarACarrito--->producto", producto);
       // console.log("agregarACarrito--->producto.id", producto.id);
       // console.log("agregarACarrito--->cantidad",  cantidad);
        // pregunta si el producto esta en el carrito
        const itemCarrito = carrito.find(item => { 
         //   console.log("itemCarrito--->item", item)
             console.log("itemCarrito--->carrito.find item.producto.id", item.producto.id);
           
             console.log("agregarACarrito--->producto.id", producto.id);
           return (  item.producto.id === producto.id )
        
        });

        if (itemCarrito) {
            console.log("el item ESTA en el carrito");
            const carritoActualizado = carrito.map(item => item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            );
            setCarrito(carritoActualizado);
        } else {
            console.log("el item NO ESTA esta en el carrito");
            // carritoPrevio: es el estado anterior que React le entrega a la función de actualización.
            //Cuando el nuevo estado depende del anterior, es recomendable usar carritoPrevio, porque React te proporciona el valor más reciente disponible para esa actualización.            
            setCarrito(carritoPrevio => [...carritoPrevio, { producto, cantidad: cantidad }]);
        }
    };
    /*const agregarACarrito = (datos) => {
        const producto = datos.producto;
        const cantidad = datos.cantidad ?? 1;
    };*/

    const eliminarDelCarrito = (id) => {

         setCarrito(carritoPrevio => {
                     return  carritoPrevio.filter(item => item.producto.id !== id) 
                    })
        //setCarrito(carritoPrevio => { carritoPrevio.filter(item => item !== id) })
    };

    const incrementarCantidad = (id) => {
        setCarrito((carritoEstadoAnterior) => {
          return  carritoEstadoAnterior.map(item => {
                if (item.producto.id === id) {
                    return {
                        ...item,
                        cantidad: item.cantidad + 1
                    };
                } else {
                    return item;
                }
            })
            /*
            carritoEstadoAnterior.map(item =>
                    item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
                )
            */
        })
    };


    const decrementarCantidad = (id) => {
        setCarrito((carritoEstadoAnterior) => {
            return carritoEstadoAnterior.map(item =>
                item.producto.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            )
                .filter(item => item.cantidad > 0)

        })
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    //devuelve la cantidad de items en el carrito
    const itemsEnCarrito = () => {
   //     console.log("itemsEnCarrito ---->carrito", carrito);
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  };

  const cobroTotal = () => {
    return carrito.reduce((acumulador, item) => acumulador + (item.producto.precio * item.cantidad), 0);
  };

    return (<CarritoContext.Provider
        value={{
            carrito,
            eliminarDelCarrito,
            agregarACarrito,
            incrementarCantidad,
            decrementarCantidad,
            vaciarCarrito,
            itemsEnCarrito,
            cobroTotal
        }}>

        {children}

    </CarritoContext.Provider>
    );

};





