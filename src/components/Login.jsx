"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()

    const onSubmit = handleSubmit(async data => {
        console.log(data);

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);

        if (res.status !== 201) {
            const resJson = await res.json();
            console.log('Respuesta JSON:', resJson);
            alert(resJson.message);
        } else {
            const resJson = await res.json();
            console.log('Respuesta JSON:', resJson);
            console.log('--------------', resJson);
            sessionStorage.setItem('Role', resJson.role);
            switch (resJson.role) {
                case 'ADMIN':

                    router.push('/models/admin');
                    break;
                case 'USER':

                    router.push('/models/user');
                    break;
                default:
                    alert('No tienes Permisos');
                    break;
            }
        }
    });


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicia Sesión con tu Cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm " >
                <form onSubmit={onSubmit} className="space-y-6" >

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900" >
                            Email:

                        </label>
                        <div className="mt-2" >
                            <input type="email"
                                {...(register("email", {
                                    required: {
                                        value: true,
                                        message: "El email es requerido"
                                    }
                                }))}
                                className="block w-full rounded-md border-0 py-1.5
                         text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                           sm:text-sm sm:leading-6"
                                placeholder="user@gmail.com" autoComplete="email" />
                        </div>


                        {
                            errors.email && (
                                <span className=" text-red-500 text-sm " >{errors.email.message}</span>
                            )
                        }
                    </div>



                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...(register("password", {
                                    required: {
                                        value: true,
                                        message: " La contraseña es requerida"
                                    }
                                }))}

                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5
                         text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                          sm:text-sm sm:leading-6"
                            />
                            {
                                errors.password && (
                                    <span className=" text-red-500 text-sm " >{errors.password.message}</span>
                                )
                            }
                        </div>
                    </div>


                    <div>
                        <button className="flex w-full justify-center rounded-md
         bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
          text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"  >
                            Login
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}
export default Login