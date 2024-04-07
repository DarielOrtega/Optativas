'use client'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


function Page({ params }) {

    const router = useRouter()
    const [nombre, setNombre] = useState("")
    const [boss, setBoss] = useState("")
    const [description, setDescription] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [file, setfile] = useState()

    useEffect(() => {
        if (params.id) {
            fetch(`/api/subjects/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setNombre(data.subject.nombre)
                    setBoss(data.subject.boss)
                    setDescription(data.subject.description)
                })
        }
    }, [])

    const onSubmit = handleSubmit(async (data) => {

        const formData = new FormData()
        formData.set('file', file)
        formData.set('nombre', nombre);
        formData.set('boss', boss);
        formData.set('description', description);

        if (params.id) {
            const res = fetch(`/api/subjects/${params.id}`, {
                method: 'PUT',
                body: formData

            })

            console.log(res)
            router.refresh()
            router.push('/models/admin')
        } else {
            const res = await fetch('/api/subjects/', {
                method: 'POST',
                body: formData

            })
            router.refresh()
            router.push('/models/admin')
        }

    })



    return (
        <div className="w-1/2 mx-auto" >
            <form onSubmit={onSubmit} >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre de la Asignatura
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input

                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder=""
                                            {...(register("subjectName", {
                                                required: {
                                                    value: true,
                                                    message: "El nombre de la asignatura  es requerido"
                                                }
                                            }))}
                                            type="text" onChange={(e) => setNombre(e.target.value)}
                                            value={nombre}

                                        />
                                        {
                                            errors.subjectName && (
                                                <span className=" text-red-500 text-sm " >{errors.subjectName.message}</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Jefe de la Asignatura
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input

                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder=""
                                            {...(register("Boss", {
                                                required: {
                                                    value: true,
                                                    message: "El nombre del Jefe de a Asignatura es requerido"
                                                }
                                            }))} type="text" onChange={(e) => setBoss(e.target.value)}
                                            value={boss}

                                        />
                                        {
                                            errors.Boss && (
                                                <span className=" text-red-500 text-sm " >{errors.Boss.message}</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    < div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-2">
                            <textarea
                                {...(register("description", {
                                    required: {
                                        value: true,
                                        message: "La descripción es requerida"
                                    }
                                }))} onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {
                                errors.description && (
                                    <span className=" text-red-500 text-sm " >{errors.description.message}</span>
                                )
                            }

                        </div>

                    </div>

                    <input type="file" placeholder='aqui es donde es'
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                        onChange={(e) => {
                            setfile(e.target.files[0])
                        }}
                    />

                    <div>

                    </div>

                    <div className='flex justify-between'>
                        <button className="bg-indigo-600 py-2 px-4 rounded
                     text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                     focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-indigo-600" type="submit"
                            onClick={async () => {
                                router.refresh()
                                router.push('/models/admin')
                            }} >

                            Crear
                        </button>
                        {
                            params.id && (
                                <button className="bg-red-500 py-2 mr-4 px-4 rounded
                            text-white shadow-sm hover:bg-red-700 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-indigo-600"
                                    type='button' onClick={async () => {
                                        const res = await fetch(`/api/subjects/${params.id}`, { method: 'DELETE' }
                                        )
                                        const data = await res.json()
                                        router.refresh()
                                        router.push('/models/admin')
                                        console.log(data)
                                    }} >
                                    Borrar
                                </button>
                            )
                        }
                    </div>

                </div>
            </form>


        </div>
    )
}

export default Page
