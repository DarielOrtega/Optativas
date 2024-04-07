'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


async function getSubjectDetails(subjectId) {
    const token = sessionStorage.getItem('token');

    const res = await fetch(`http://localhost:3000/api/subjects/${subjectId}`, {
        cache: "no-store",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const data = await res.json();
    return data;
}

function SubjectDetailPage() {
    const router = useRouter();
    const subjectId = params.id;
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        if (subjectId) {
            const fetchSubjectDetails = async () => {
                const subjectDetails = await getSubjectDetails(subjectId);
                setSubject(subjectDetails);
            };

            fetchSubjectDetails();
        }
    }, [subjectId]);


    const handleEnrollmentRequest = async () => {

    };

    if (!subject) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>{subject.nombre}</h1>
            <p>{subject.description}</p>
            <button onClick={handleEnrollmentRequest}>Enviar Solicitud de Inscripción</button>
        </div>
    );
}

export default SubjectDetailPage;