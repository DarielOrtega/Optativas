import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import db from '../../../../libs/db';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(request) {
    try {
        const data = await request.json();

        const userFound = await db.user.findUnique({ where: { email: data.email } })
        if (!userFound) {
            return NextResponse.json({ message: "No existe el usuario " }, { status: 400 })
        }

        const matchPassword = await bcrypt.compare(data.password, userFound.password)
        if (!matchPassword) {
            return NextResponse.json({ message: "Credenciales incorrectas" }, { status: 400 })

        }

        const { password_, ...user } = userFound

        const token = await jwt.sign({ id: user.id, role: user.role },
            process.env.SECRET_KEY, { expiresIn: '1d' })



        const serialized = serialize('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        })



        const response = NextResponse.json({ user, token }, { status: 201 })


        response.headers.set('Set-Cookie', serialized)
        return response

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

