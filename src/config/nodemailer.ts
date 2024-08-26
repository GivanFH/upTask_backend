import nodemailer from 'nodemailer'
import dotv from 'dotenv'
import dotenv from 'dotenv';
dotenv.config()

const config = () => {
    return {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }
}

export const transporter = nodemailer.createTransport(config())