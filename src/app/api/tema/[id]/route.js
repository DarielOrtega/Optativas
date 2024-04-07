import { NextResponse, NextRequest } from 'next/server';
import db from '../../../../libs/db';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

export async function GET(request, { params }) {
    try {

        const temaFound = await db.tema.findUnique({ where: { id: Number(params.id) } });
        if (!temaFound) {

            return NextResponse.json({ message: 'No se encontró el tema' }, { status: 404 });
        }


        return NextResponse.json({ temaFound }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}


export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const temaFound = await db.tema.findUnique({ where: { id: Number(params.id) } });
        if (!temaFound) {
            return NextResponse.json({ message: 'No se encontró el tema' }, { status: 404 });
        }

        const temaUpdated = await db.tema.update({
            where: { id: Number(params.id) },
            data: data,
        });

        return NextResponse.json({ temaUpdated }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const temaRemoved = await db.tema.delete({ where: { id: Number(params.id) } });
        if (!temaRemoved) {
            return NextResponse.json({ message: 'No se encontró el tema' }, { status: 404 });
        }
        return NextResponse.json({ temaRemoved }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}