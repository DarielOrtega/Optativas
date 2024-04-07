import { NextResponse } from "next/server"
import db from "../../../../libs/db"
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const data = await request.json()

        const userFound = await db.user.findUnique({ where: { email: data.email } })
        if (userFound) {
            return NextResponse.json({ message: "El email ya existe" }, { status: 400 })
        }

        const usernameFound = await db.user.findUnique({ where: { username: data.username } })
        if (usernameFound) {
            return NextResponse.json({ message: "El nombre de Usuario ya existe" }, { status: 400 })
        }

        data.password = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role
            }
        })


        const { password_, ...user } = newUser

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}