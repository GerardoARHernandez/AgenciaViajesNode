import { Testimonios } from "../models/Testimonios.js";


const guardarTestimonio = async(req, res) =>{

    //Validar
    const { nombre, email, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({alerta: 'El nombre está vacio'});
    };

    if (email.trim() === '') {
        errores.push({alerta: 'El correo está vacio'});
    };

    if (mensaje.trim() === '') {
        errores.push({alerta: 'El mensaje está vacio'});
    };

    if (errores.length > 0) {

        //Consultar Testimonios existentes
        const testimonios = await Testimonios.findAll();
        
        //Mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            email,
            mensaje,
            testimonios
        })
    }else{
        //Almacenarlo en la base de datos
        try {
            await Testimonios.create({
                nombre, email, mensaje
            });

            res.redirect('/testimonios');
        } catch (error) {
            console.log(error);
        }

    }
}

export {
    guardarTestimonio
}