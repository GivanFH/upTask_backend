import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]
        console.log("Origin:", origin);
        if (process.argv[2] === '--api') {
            whitelist.push(undefined)
        }

        //Esto tambien arregla el error de CORS por ser undefined
        // if (!origin || whitelist.includes(origin))

        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
            console.log('Ocurrio un error')
        }
    }
}