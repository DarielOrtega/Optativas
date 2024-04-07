'use client'
import { useState, useEffect } from "react";
import Subjectcard from "@/components/SubjectsCard";
import TemaCard from "@/components/TemaCard"
import { useRouter } from "next/navigation";

async function getSubjects() {
    const token = sessionStorage.getItem('token');

    const res = await fetch('http://localhost:3000/api/subjects', {
        cache: "no-store",
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const data = await res.json();
    return data;
}

async function getTemas() {
    const res = await fetch('http://localhost:3000/api/tema', {
        cache: "no-store",
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}

const handleLogout = (router) => {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    router.push('/');

}

function AdminPage() {
    const [subjects, setSubjects] = useState([]);
    const [temas, setTemas] = useState([]);
    const [showTemas, setShowTemas] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchSubjects = async () => {
            const subjectsData = await getSubjects();

            subjectsData.forEach(subject => {
                if (subject.imageUrl) {
                    const parts = subject.imageUrl.split('\\');
                    const lastPart = parts.pop();
                    subject.imageUrl = '/' + lastPart;
                }
            });

            setSubjects(subjectsData);
        };

        fetchSubjects();
    }, []);

    const handleClickTemas = async () => {
        const temasData = await getTemas();

        temasData.forEach(tema => {
            if (tema.eductionalResource) {
                const parts = tema.eductionalResource.imageUrl.split('\\');
                const lastPart = parts.pop();
                tema.educationalResource = '/' + lastPart;
            }
        });
        console.log(temasData)
        setTemas(temasData);
        setShowTemas(true);
    };

    const onlogout = () => handleLogout(router);

    return (
        <div>

            <h1 className="mb-4 text-xl font-extrabold text-center
      text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600
         from-sky-400">Página del</span> Administrador</h1>


            <div className="grid grid-cols-3 gap-4" >
                <button className="bg-indigo-600 py-2 px-4 rounded
              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"  onClick={handleClickTemas}>Temas</button>

                <button className="bg-indigo-600 py-2 px-4 rounded
              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"  onClick={() => router.push('/auth/register')}>Registrar</button>

                <button className="bg-indigo-600 py-2 px-4 rounded
              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"  onClick={() => router.push('/subjects/new')}>Nueva Asignatura</button>
            </div>

            <section className="container mx-auto">
                <div className="grid grid-cols-3 gap-3 mt-10">
                    {subjects.map((subject) =>
                    (<Subjectcard subject={subject} key={subject.id} />
                    ))}

                </div>
            </section>
            {showTemas && (
                <section className="container mx-auto mt-10">
                    <div className="grid grid-cols-3 gap-3">
                        {temas.map((tema) => (
                            <TemaCard tema={tema} key={tema.id} />
                        ))}
                    </div>
                </section>

            )}

            <div className=" flex justify-center items-center " >
                <button className="bg-indigo-600 py-2 px-4 rounded
              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"  onClick={onlogout} >Cerrar Sesión</button></div>

        </div>
    );
}

export default AdminPage;