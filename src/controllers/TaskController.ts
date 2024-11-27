import type { Request, Response } from 'express'
import Task from '../models/Tasks'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {

        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project') //Populate como una union de SQL
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {

        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateTask = async (req: Request, res: Response) => {

        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save();
            res.send("Tarea Actualizada Correctamente")
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {

        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())  //Trae todas las task excepto la task.id que estamos elimando
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send("Tarea Eliminada Correctamente")

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            req.task.status = status
            if (status === 'pending') {
                req.task.completedBy = null
            } else {
                req.task.completedBy = req.user.id
            }
            await req.task.save()
            res.send('Tarea Actualizada')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }
}