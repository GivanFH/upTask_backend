import express from 'express'
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from 'morgan';
import { corsConfig } from './config/cors';
import ProjectRoutes from './routes/projectRoutes';

dotenv.config()

connectDB()

const app = express()
app.use(cors(corsConfig))

//loggin
app.use(morgan('dev'))

//Aceptar informacion de formularios
app.use(express.json())

//Routes
app.use('/api/projects', ProjectRoutes)

export default app