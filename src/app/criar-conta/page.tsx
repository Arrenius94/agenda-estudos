'use client'

import Image from "next/image"
import LogoConta from "../../image/criar-conta.png"
import { MyInput } from "../../components/input"
import { useState } from "react"
import { MyButton } from "../../components/button"
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useRouter } from 'next/navigation'

export default function CreateLogin() {
    const [name, setname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const router = useRouter()

    const backList = (e) => {
        e.preventDefault()
        router.push('/login')
    }

    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-300">
                <div className="w-auto rounded-lg mb-40 bg-gray-200 p-6 shadow-lg">
                    <div className="text-center">
                        <Image
                            width={200}
                            height={160}
                            alt="logo-criar-conta"
                            className="mx-auto"
                            src={LogoConta}
                        />
                    </div>
                    <h1 className="text-center text-2xl font-bold tracking-tight text-black">Crie Sua Conta! :)</h1>

                    <div className="mt-5 flex flex-row gap-2 justify-center">
                        <MyInput
                            className="w-xs"
                            placeholder='Email'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="mt-5 flex flex-row gap-2 justify-center">
                        <MyInput
                            className="w-xs"
                            placeholder='Nome'
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />

                        {/* <MyInput
                            placeholder='Idade'
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        /> */}
                    </div>

                    <div className="mt-5">
                        <label className="block mb-1">Data de Nascimento</label>

                        <div className="flex flex-wrap gap-2">
                            {/* Dia */}
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="border p-2 rounded w-24 border-black focus:border-green-600 text-sm  bg-white focus:outline-none"
                            >
                                <option value="">Dia</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>

                            {/* Mês */}
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="border p-2 rounded w-36 border-black focus:border-green-600 text-sm  bg-white focus:outline-none"
                            >
                                <option value="">Mês</option>
                                {[
                                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
                                ].map((mes, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {mes}
                                    </option>
                                ))}
                            </select>

                            {/* Ano */}
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="border p-2 rounded w-28 border-black focus:border-green-600 text-sm  bg-white focus:outline-none"
                            >
                                <option value="">Ano</option>
                                {Array.from({ length: 100 }, (_, i) => {
                                    const currentYear = new Date().getFullYear();
                                    const yearOption = currentYear - i;
                                    return (
                                        <option key={yearOption} value={yearOption}>
                                            {yearOption}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>


                    <footer className="bg-zinc-500 text-white px-4 py-4 mt-6 rounded-md flex flex-wrap justify-between">
                        <MyButton className="px-3 py-2 text-sm" color="green" type="submit">
                            <ArrowUpwardIcon fontSize="small" /> Salvar
                        </MyButton>

                        <MyButton className='px-3 py-2 text-sm' onClick={backList} color='red' type="button">
                            <CancelIcon fontSize='small' /> Cancelar
                        </MyButton>
                    </footer>
                </div>
            </main>
        </>
    )
}