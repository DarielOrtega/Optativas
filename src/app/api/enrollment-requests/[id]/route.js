import { NextResponse } from "next/server";

export async function GET(request) {
    const userId = request.headers.get('user-id');
    const requests = await db.enrollmentRequest.findMany({
        where: { userId },
    });
    return NextResponse.json(requests, { status: 200 });
}



export async function PUT(request, { params }) {
    const data = await request.json();
    const updatedRequest = await db.enrollmentRequest.update({
        where: { id: Number(params.id) },
        data: { status: data.status },
    });
    return NextResponse.json(updatedRequest, { status: 200 });
}