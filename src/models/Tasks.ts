import mongoose, { Schema, Document, Types } from "mongoose"

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string
    description: string
    project: Types.ObjectId
    status: TaskStatus
    completedBy: Types.ObjectId
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: { //esto va en populate
        type: Types.ObjectId,
        ref: 'Project' //Referencia para relacionar task y projects
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), //Un valor de cada uno de ellos con enum
        default: taskStatus.PENDING
    },
    completedBy: {
        type: Types.ObjectId,
        ref: 'User',
        default: null
    }

}, { timestamps: true })

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
