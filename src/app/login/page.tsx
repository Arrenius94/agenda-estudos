'use client'

import Image from 'next/image';
import Logo from '../../image/icone-medico-caduceu-bastao-de-hermes_874813-14450-removebg-preview.png'
import { MyButton } from '../../components/button';
import { MyInput } from '../../components/input';
import { MyPasswordInput } from '../../components/input-password'
import { useState } from 'react';
import Link from 'next/link';
export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-300">
                <div className="w-md rounded-lg bg-gray-200 p-6 shadow-lg">
                    <div className="text-center">
                        <Image
                            className="mx-auto"
                            alt="Logo Zapido"
                            src={Logo}
                            width={190}
                            height={150}
                        />
                        <h2 className="mt-10 text-2xl font-bold tracking-tight text-black">
                            Faça login da sua conta
                        </h2>
                    </div>

                    <div className="mt-10">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-black"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <MyInput
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        placeholder=""
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500"
                                    />
                                    {/* <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-green-600"
                                    /> */}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-black"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link
                                            href="#"
                                            className="font-semibold text-green-500 hover:text-green-400"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <MyPasswordInput
                                        placeholder=""
                                        className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500"
                                        value={password}
                                        required
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {/* <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-green-600"
                                    /> */}
                                </div>
                            </div>

                            <div>
                                {/* <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  Sign in
                </button> */}
                                <MyButton
                                    className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                                    type='submit'
                                >
                                    Entrar
                                </MyButton>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-600">
                            Não é membro?{' '}
                            <Link
                                href="/criar-conta"
                                className="font-semibold text-green-500 hover:text-green-400"
                            >
                                Crie sua conta
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
