'use client'

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Image from 'next/image'
import List from '../../image/lista-png.png'
import Link from 'next/link'
import { MyButton } from '../../components/button';

export default function Agenda() {
    return (
        <div className="">

            {/* Título */}
            <div className='flex justify-center items-center mt-10'>
                <Image src={List} alt="Logo-MED" title="Logo-Med" width={45} height={30} />
                <h1 className='ml-2 font-bold text-5xl'>Anotações ☺</h1>
            </div>

            {/* Container principal */}
            <div className='rounded-md shadow-md overflow-hidden mt-10 w-full max-w-[1250px] mx-auto'>
                {/* Cabeçalho */}
                <header className="bg-zinc-800 text-white px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/criar-estudo" className="p-3 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-2">
                            <FormatListBulletedIcon fontSize="small" />
                            Novo Estudo
                        </Link>
                    </div>
                </header>

                {/* Campo de busca */}
                <div className='p-4 flex items-center gap-2'>
                    <input
                        className='border border-black rounded focus:border-green-500 text-sm p-3 w-full bg-white'
                        placeholder='Digite para pesquisar'
                        type="text"
                    />
                    <MyButton color='green'><SearchIcon fontSize='small' /> Pesquisar</MyButton>
                    {/* <button className='bg-green-500 text-black px-4 py-2.5 rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-1'>
                        <SearchIcon fontSize='small' />
                        Pesquisar
                    </button> */}
                </div>
            </div>

            {/* Tabela */}
            <div className="rounded-md shadow-md overflow-hidden mt-6 w-full max-w-[1250px] mx-auto">
                {/* Cabeçalho da tabela */}
                <div className="bg-zinc-800 text-white px-4 py-3 flex items-center gap-2">
                    <span className="text-lg font-semibold flex items-center gap-2">
                        <FormatListBulletedIcon fontSize="small" />
                        Anotações Dos Estudos
                    </span>
                </div>

                {/* Tabela */}
                <div className="bg-white">
                    <table className="min-w-full text-center border-collapse">
                        <thead className="border-b">
                            <tr>
                                <th className="px-4 py-2 font-semibold text-center">Título</th>
                                <th className="px-4 py-2 font-semibold text-center">Descrição</th>
                                <th className="px-4 py-2 font-semibold text-center">Data da Conclusão</th>
                                <th className="px-4 py-2 font-semibold text-center">Horas de Estudos</th>
                                <th className="px-4 py-2 font-semibold text-center">Visualizar</th>
                                <th className="px-4 py-2 font-semibold text-center">Editar</th>
                                <th className="px-4 py-2 font-semibold text-center">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b text-center">
                                <td className="px-4 py-3 align-middle">Rins</td>
                                <td className="px-4 py-3 align-middle">Cirurgia rins</td>
                                <td className="px-4 py-3 align-middle">15/04/2025</td>
                                <td className="px-4 py-3 align-middle">4:00</td>
                                <td className="px-4 py-3 align-middle"><button><VisibilityIcon fontSize="large" className="text-blue-500 hover:text-blue-400 active:opacity-75 cursor-pointer" /></button></td>
                                <td className="px-4 py-3 align-middle"><button><EditIcon fontSize="large" className="text-green-500 hover:text-green-400 transition active:opacity-75 cursor-pointer" /></button></td>
                                <td className="px-4 py-3 align-middle"><button><DeleteForeverIcon fontSize="large" className="text-red-500 hover:text-red-400 transition active:opacity-75 cursor-pointer" /></button></td>
                            </tr>

                            <tr className="border-b text-center">
                                <td className="px-4 py-3 align-middle">Rins</td>
                                <td className="px-4 py-3 align-middle">Cirurgia Cabeça</td>
                                <td className="px-4 py-3 align-middle">15/04/2025</td>
                                <td className="px-4 py-3 align-middle">6:00</td>
                                <td className="px-4 py-3 align-middle"><button><VisibilityIcon fontSize="large" className="text-blue-500" /></button></td>
                                <td className="px-4 py-3 align-middle"><button><EditIcon fontSize="large" className="text-green-500" /></button></td>
                                <td className="px-4 py-3 align-middle"><button><DeleteForeverIcon fontSize="large" className="text-red-500" /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>

    )
}