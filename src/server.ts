import express from 'express'
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import ProjectRoutes from './routes/projectRoutes';

dotenv.config()

connectDB()

const app = express()

//Aceptar informacion de formularios
app.use(express.json())

//Routes
app.use('/api/projects', ProjectRoutes)

export default app