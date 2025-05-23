'use client'

import Image from "next/image"
import LogoConta from "../../image/criar-conta.png"
import { MyInput } from "../../components/input"
import { useState } from "react"

export default function CreateLogin() {
    const [name, setname] = useState('');
    const [age, setAge] = useState('');

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-300">
                <div className="w-auto rounded-lg mb-72 bg-gray-200 p-6 shadow-lg">
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

                    <div className="mt-5 flex flex-row gap-2">
                        <MyInput
                            className="w-xs"
                            placeholder='Nome'
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />

                        <MyInput
                            placeholder='Idade'
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {/* Dia */}
                        <select
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className="border p-2 rounded w-24"
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
                            className="border p-2 rounded w-36"
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
                            className="border p-2 rounded w-28"
                        >
                            <option value="">Ano</option>
                            {Array.from({ length: 100 }, (_, i) => {
                                const currentYear = new Date().getFullYear()
                                const yearOption = currentYear - i
                                return (
                                    <option key={yearOption} value={yearOption}>
                                        {yearOption}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </main>
        </>
    )
}