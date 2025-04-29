import Link from "next/link";

import Image from 'next/image'
import Logo from '../../image/icone-medico-caduceu-bastao-de-hermes_874813-14450-removebg-preview.png'

export function Header() {
    return (
        <header className="w-full bg-zinc-900 text-white transition">
            <div className="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-7xl">
                <div>
                    Agenda De Estudos :)
                </div>

                <nav>
                    <ul className="flex items-center justify-center gap-8">
                        <li>
                            <Link href="/" className="hover:text-green-500 transition active:opacity-75 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/agenda" className="hover:text-green-500 transition active:opacity-75 transition">
                                Agenda
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}