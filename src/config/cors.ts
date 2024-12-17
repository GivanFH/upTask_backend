import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.HIDALGO_URL,process.env.HIDALGO_URL_FRONT, process.env.LOCALHOST]

        console.log("Origin:", origin);
        
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
            console.log('Ocurrio un error')
        }
    }
}