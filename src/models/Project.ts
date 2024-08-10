import monogoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose'
import { ITask } from './Tasks'

//PopulateDoc ayuda a traer toda la referencia de Task al trabajarlo como un subdocumento
//typescript
export interface IProject extends Document  {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] //Referencia para que se relacionen 
}

//mongodb
const ProjectSchema: Schema = new Schema({
    projectName : {
        type: String,
        required: true,
        trim: true
    },
    clientName : {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, {timestamps: true})

const Project = monogoose.model<IProject>('Project', ProjectSchema)
export default Project