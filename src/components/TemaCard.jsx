'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function TemaCard({ tema }) {
    const router = useRouter();
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    const handleClick = () => {
        if (userRole === 'ADMIN') {
            router.push('/tema/edit/' + tema.id);
        }
    };

    return (
        <div className="group relative"
            onClick={handleClick} >
            <h3 className="mt-6 text-sm text-gray-800" >{tema.name} </h3>
            <p className="text-base font-semibold tex-gray-900" >{tema.description}</p>
            <h3 className="mt-6 text-sm text-gray-800" >
                nombre de la Asignatura: {tema.subject.nombre} </h3>
            <div>
                <a href="tema.educationalResource " download>
                    <iframe src="tema.educationalResource" width="100%" height="500px"></iframe>
                </a>
            </div>
        </div>
    )
}



export default TemaCard