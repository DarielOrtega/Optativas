import { NextResponse, NextRequest } from 'next/server';
import db from '@/libs/db';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import multer from 'multer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { write } from 'fs';

export async function GET(request) {

    try {

        const q = request.query ? request.query.q : undefined;

        const authHeader = request.headers.get('Authorization');

        /* const token = authHeader.split(' ')[1];
         if (!token) {
             return NextResponse.json({ message: 'Debe autenticarse' }, { status: 401 })
         }
 
         const data = await verify(token, process.env.SECRET_KEY)*/

        const subjects = q
            ? await db.subjects.findMany({
                where: {
                    name: {
                        contains: q,
                        mode: 'insensitive',
                    },
                },
            })
            : await db.subjects.findMany();
        if (!subjects) {
            return NextResponse.json({ message: 'No se encontraron asignaturas' }, { status: 404 })
        }
        return NextResponse.json(subjects, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

export async function POST(request) {

    try {


        const data = await request.formData()

        const file = data.get('file')
        const nombre = data.get('nombre')
        const boss = data.get('boss')
        const description = data.get('description')

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public', file.name)
        console.log(filePath)
        writeFile(filePath, buffer)


        const subject = await db.subjects.create({
            data: {
                nombre: nombre,
                boss: boss,
                description: description,
                imageUrl: filePath
            }
        })
        console.log(subject)

        return NextResponse.json({ subject }, { status: 201 })

        /* return NextResponse.json({ message: 'POST request' }, { status: 200 })*/
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}




