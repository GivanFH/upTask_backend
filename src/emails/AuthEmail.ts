import { transporter } from '../config/nodemailer';

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {

    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'uptask <admin@uptask.com>',
            to: user.email,
            subject: 'uptask - confirma tu correo',
            text: 'uptask - Confirma tu cuenta',
            html: `
            <p>Hola : ${user.name}, has creado tu cuenta en upTask, solo deber confirmar tu cuenta </p>
            <p> Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu cuenta</a>
            <p>E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
        })
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'uptask <admin@uptask.com>',
            to: user.email,
            subject: 'uptask - Restablece tu contraseña',
            text: 'uptask - Restablece tu contraseña',
            html: `
            <p>Hola : ${user.name}, haz solictado restablecer tu contraseña.</p>
            <p> Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablece tu contraseña</a>
            <p>E ingresa el codigo: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `,
        })
    }
}