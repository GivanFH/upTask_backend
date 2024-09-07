import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        //Asigna un manager
        project.manager = req.user.id

        try {
            await project.save()
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: {$in: req.user.id}}
                ]
            })

            if (projects.length === 0) {
                const error = new Error('No hay proyectos')
                // return res.status(404).json({ error: error.message })
            }

            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                const error = new Error('Proyecto no Encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Accion no válida')
                return res.status(404).json({error: error.message})
            }

            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Proyecto no Encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el manager puede actualizar un proyecto')
                return res.status(404).json({error: error.message})
            }

            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description

            await project.save()
            res.send('Proyecto Actualizado')

        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id, req.body)

            if (!project) {
                const error = new Error('Proyecto no Encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el manager puede eliminar un proyecto')
                return res.status(404).json({error: error.message})
            }

            await project?.deleteOne()
            res.send('Proyecto Eliminado')

        } catch (error) {
            console.log(error)
        }
    }
}