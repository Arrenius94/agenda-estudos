'use client'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { InputFloatingTime } from '../../components/input-floating-time'
import { InputFloatingDate } from '../../components/input-floating-date'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function CriarEstudo() {
    const [hour, setHour] = useState('');
    const [date, setDate] = useState('');
    const [observation, setObservation] = useState('');
    const router = useRouter()

    const backList = (e) => {
        e.preventDefault()
        router.push('/agenda')
    }


    return (
        <div>
            <div className='rounded-md shadow-md overflow-hidden mt-10 w-full max-w-[1250px] mx-auto'>
                {/*Cabeçalho*/}
                <header className="bg-zinc-800 text-white px-4 py-4">
                    <div>
                        <FormatListBulletedIcon fontSize="small" className='mb-0.5' /> Cadastrar
                    </div>
                </header>

                {/*Campo de Cadastro*/}
                <div className='flex flex-wrap gap-4 p-2'>
                    <input
                        type="text"
                        className='flex-1 min-w-[200px] max-w-[350px] mt-5 ml-6 mb-3 p-3 border border-black rounded  text-sm w-full bg-white'
                        placeholder='Titulo *'
                    />

                    <input
                        type="text"
                        className='flex-1 min-w-[200px] max-w-[350px] mt-5 ml-1 mb-3 border border-black rounded text-sm p-3 w-full bg-white'
                        placeholder='Descrição *'
                    />


                    <InputFloatingTime
                        id="hora-tarde"
                        label="Horas da Estudo"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                    />

                    <InputFloatingDate
                        id="data"
                        label="Data de Conclusão"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />


                    {/* <input
                        type="time"
                        className='flex-1 min-w-[60px] max-w-[120px] p-3 mt-5 ml-2 mb-3 p-3 border border-black rounded focus:border-green-500 text-sm p-2 w-full bg-white'
                        placeholder='Horas De Estudos'
                    /> */}
                </div>

                <div className='p-2 ml-6'>
                    <textarea rows={8} className='w-96  p-1.5 border border-black rounded' placeholder='OBSERVAÇÕES' name="" id=""></textarea>
                </div>

                <footer className="bg-zinc-200 text-white px-4 py-4 flex flex-wrap gap-4 p-2">
                    <button
                        type="submit"
                        className='bg-green-500 text-black ml-5 px-4 py-2.5 rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-1'>
                        <ArrowUpwardIcon fontSize='small' />
                        Salvar
                    </button>

                    <button
                        onClick={backList}
                        className='bg-red-500 text-black ml-5 px-4 py-2.5 rounded hover:bg-red-400 transition active:opacity-75 cursor-pointer flex items-center gap-1'>
                        <CancelIcon fontSize='small' />
                        Cancelar
                    </button>
                </footer>
            </div>
        </div>
    )
}