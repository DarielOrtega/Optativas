'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
function Subjectcard({ subject }) {

    const router = useRouter();
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        const role = sessionStorage.getItem('userRole');

        setUserRole(role);
    }, []);
    const handleClick = () => {
        if (userRole === 'ADMIN') {
            router.push(`/subjects/edit/${subject.id}`);
        } else {
            router.push(`/subjects/request/${subject.id}`);
        }
    };
    return (
        <div className="group relative"
            onClick={handleClick}  >
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                    src={subject.imageUrl}
                    alt={'Imagen de ' + subject.nombre}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <h3 className="mt-6 text-sm text-gray-900">
                {subject.nombre}
            </h3>
            <p className="text-base font-semibold text-gray-900">{subject.description}</p>
        </div>
    )
}

export default Subjectcard