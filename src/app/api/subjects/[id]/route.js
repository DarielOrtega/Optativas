import { NextResponse, NextRequest } from "next/server"
import db from '../../../../libs/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import { write } from 'fs';


export async function GET(request, { params }) {

    try {

        const subject = await db.subjects.findUnique({ where: { id: Number(params.id) } })
        if (!subject) {
            return NextResponse.json({ message: 'No se encontraró la asignatura' }, { status: 404 })
        }
        return NextResponse.json({ subject }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}



export async function PUT(request, { params }) {
    try {

        const data = await request.formData()
        const file = data.get('file')
        const nombre = data.get('nombre')
        const boss = data.get('boss')
        const description = data.get('description')

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public', file.name)
        writeFile(filePath, buffer)


        const subjectUpdated = await db.subjects.update({
            where: { id: Number(params.id) },
            data: {
                nombre: nombre,
                boss: boss,
                description: description,
                imageUrl: filePath
            }

        })

        console.log(subjectUpdated)

        return NextResponse.json({ subjectUpdated }, { status: 200 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}

export async function DELETE(request, { params }) {

    try {
        const subjectRemoved = await db.subjects.delete({ where: { id: Number(params.id) } })
        if (!subjectRemoved) {
            return NextResponse.json({ message: 'No se encontraró la Asignatura' }, { status: 404 })
        }
        return NextResponse.json({ subjectRemoved }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}
