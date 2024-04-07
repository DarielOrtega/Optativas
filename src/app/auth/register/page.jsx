"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


function registerPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = handleSubmit(async (data) => {

        if (data.password !== data.confirmPassword) {
            return alert('Las contraseñas no coinciden')
        }
        console.log(data)

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.rol,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        resJson = await res.json()
        if (res.ok) {
            alert('Usuario Creado')

        } else {
            alert('error al registrar usuario')

        }


    })

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Optativas"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registra un Usuario Aquí
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={onSubmit}>

                    <div>
                        <label htmlFor="username" className="text-slate-500 mb-2  block text-sm" >
                            Nombre de Usuario:
                        </label>
                        <div>
                            <input type="text"
                                {...(register("username", {
                                    required: {
                                        value: true,
                                        message: "El nombre de usuario es requerido"
                                    }
                                }))}
                                className="block w-full rounded-md border-0
               py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
                                placeholder="ingresa un nombre para el usuario" />
                        </div>

                        {
                            errors.username && (
                                <span className=" text-red-500 text-sm " >{errors.username.message}</span>
                            )
                        }
                    </div>

                    <div>

                        <label htmlFor="Email" className="text-slate-500 mb-2  block text-sm" >
                            Email:
                        </label>

                        <input type="email"
                            {...(register("email", {
                                required: {
                                    value: true,
                                    message: "El email es requerido"
                                }
                            }))}
                            className="block w-full rounded-md border-0
                         py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="user@gmail.com" />
                        {
                            errors.email && (
                                <span className=" text-red-500 text-sm " >{errors.email.message}</span>
                            )
                        }
                    </div>

                    <div>

                        <label htmlFor="Email" className="text-slate-500 mb-2  block text-sm" >
                            ROL:
                        </label>

                        <select
                            {...(register("rol"))}
                            className="block w-full rounded-md border-0
                         py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                         focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                            <option value="USER" className="text-slate-500 mb-2 w-full rounded-md border-0 sm:text-sm sm:leading-6  block text-sm" >USER</option>
                            <option value="ADMIN" className="text-slate-500 mb-2  w-full rounded-md border-0 sm:text-sm sm:leading-6 block text-sm"    >ADMIN</option>
                        </select>
                        {
                            errors.rol && (
                                <span className=" text-red-500 text-sm " >{errors.rol.message}</span>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" >
                            Contraseña:
                        </label>

                        <input type="password"
                            {...(register("password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida"
                                }
                            }))}
                            className="block w-full rounded-md border-0 py-1.5
                                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                  sm:text-sm sm:leading-6"
                            placeholder="******"
                            autoComplete="current-password"
                            required />

                        {
                            errors.password && (
                                <span className=" text-red-500 text-sm  " >{errors.password.message}</span>
                            )
                        }
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900" >
                            Confirmar contraseña:
                        </label>

                        <input type="password"
                            {...(register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Debes comfirmar tu contraseña"
                                }
                            }))}
                            className="block w-full rounded-md border-0 py-1.5
                                 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                  sm:text-sm sm:leading-6"
                            placeholder="******"
                            autoComplete="current-password"
                            required />
                        {
                            errors.confirmPassword && (
                                <span className=" text-red-500 text-sm  " >{errors.confirmPassword.message}</span>
                            )
                        }
                    </div>
                    <div>
                        <button className="flex w-full justify-center rounded-md
                 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
                  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-indigo-600" type="submit"

                            onClick={() => router.push('/models/admin')}   >
                            Registrar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default registerPage;