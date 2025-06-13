'use client';

import Link from "next/link";
import Image from 'next/image';
import Logo from '../../image/icone-medico-caduceu-bastao-de-hermes_874813-14450-removebg-preview.png';
import { MyButton } from "../button";

export function Header() {
    const handleLogout = async () => {
        // Opcional: chamar sua API para remover token/cookie no backend
        await fetch('/api/logout', { method: 'POST' });

        // Redirecionar para a página de login
        window.location.href = '/login';
    };

    return (
        <header className="w-full bg-zinc-900 text-white transition">
            <div className="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-7xl">
                <div>
                    Agenda De Estudos :)
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-8">
                        <li>
                            <Link href="/pagina-inicial" className="hover:text-green-500 transition active:opacity-75">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/agenda" className="hover:text-green-500 transition active:opacity-75">
                                Agenda
                            </Link>
                        </li>
                        <li>
                            <MyButton
                                type='button'
                                onClick={handleLogout}
                                className="bg-transparent border-none text-white hover:text-green-500 hover:bg-transparent transition active:opacity-75"
                            >
                                Sair
                            </MyButton>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
