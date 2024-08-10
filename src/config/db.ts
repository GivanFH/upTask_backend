import mongoose from "mongoose";
import colors from 'colors';
import { exit } from 'node:process'

export const connectDB = async () => {
    
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL!)
        // console.log(connection)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.bgGreen.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log(colors.bgRed.bold('Error al conectar a MongoDB'))
        exit(1)
    }
}