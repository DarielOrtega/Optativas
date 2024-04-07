import { NextResponse } from "next/server";
import db from '@/libs/db'

export async function GET() {
    try {
        const requests = await db.enrollmentRequest.findMany();
        return NextResponse.json(requests, { status: 200 });
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }

}


export async function POST(request) {
    try {
        const data = await request.json();
        const { userId, subjectId } = data;
        const newRequest = await db.enrollmentRequest.create({
            data: {
                userId,
                subjectId,
                status: 'PENDING',
            },
        });
        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}


