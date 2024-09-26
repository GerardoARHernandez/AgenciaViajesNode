import {Viaje} from '../models/Viaje.js';
import { Testimonios } from '../models/Testimonios.js';

const paginaInicio = async (req, res) =>{ //req - Lo que enviamos : res - Lo que express nos responde
    
    //Consultar 3 viajes del modelo Viaje y Testimonios

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3}));
    promiseDB.push( Testimonios.findAll({ limit: 3}));

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        });

    } catch (error) {
        console.log(error)
    }

};

const paginaNosotros = (req, res) =>{ 

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async(req, res) =>{ 

    //Consultar BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
};

const paginaTestimonios = async(req, res) =>{ 

    try {
        const testimonios = await Testimonios.findAll();
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        });
    } catch (error) {
        console.log(error)
    }

    
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) =>{

    const { slug} = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug: slug}});

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}



export {
    paginaInicio, paginaNosotros, paginaViajes, paginaTestimonios, paginaDetalleViaje
}