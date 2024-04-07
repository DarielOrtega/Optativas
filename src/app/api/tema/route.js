import { NextResponse, NextRequest } from 'next/server';
import db from '../../../libs/db';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import { writeFile } from 'fs/promises';
import path from 'path';
import { write } from 'fs';



export async function GET(request) {
    try {
        const q = request.query ? request.query.q : undefined;

        const temas = q
            ? await db.tema.findMany({
                where: {
                    name: {
                        contains: q,
                        mode: 'insensitive',
                    },
                },
                include: {
                    subject: true,
                },
            })
            : await db.tema.findMany({
                include: {
                    subject: true,
                },
            });

        if (!temas) {
            return NextResponse.json({ message: 'No se encontraron temas' }, { status: 404 });
        }
        return NextResponse.json(temas, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}



export async function POST(request) {
    try {

        const data = await request.formData()

        const name = data.get('name')
        const file = data.get('file')
        const description = data.get('description')
        const subjectName = data.get('subjectName')

        const subject = await db.subjects.findUnique({
            where: {
                nombre: subjectName
            }
        });

        if (!subject) {
            return NextResponse.json({ message: 'Asignatura no encontrada' }, { status: 404 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);

        writeFile(filePath, buffer);

        const tema = await db.tema.create({
            data: {
                name: name,
                description: description,
                subjectId: subject.id,
                educationalResources: filePath
            },
        });

        return NextResponse.json({ tema }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}