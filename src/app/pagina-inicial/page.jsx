'use client'

import Image from 'next/image'
import Logo from '../../image/icone-medico-caduceu-bastao-de-hermes_874813-14450-removebg-preview.png'

export default function HomePage() {
    return (
        <div className="mt-20 px-2">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-7xl">
                <Image className='ml-12' src={Logo} alt="Logo-MED" title="Logo-Med" width={700} height={300} />
                <div className="bg-emerald-500 rounded-2xl p-6 max-w-3xl">
                    <h1 className="text-2xl font-bold mb-4">Página Inicial</h1>
                    <p className="text-justify">
                        Este sistema é uma Agenda de Estudos desenvolvida com o objetivo de organizar e acompanhar sua rotina de estudos de forma simples e eficiente.
                        <br /><br />
                        No topo da tela, você verá o cabeçalho (header), que contém o nome do sistema Agenda De Estudos : ao centro, e um menu de navegação à direita com os links “Home” e “Agenda” — facilitando o acesso rápido às principais páginas.
                        <br /><br />
                        A principal funcionalidade da aplicação é um calendário personalizado, onde o usuário pode:
                        <br />• Marcar as horas estudadas em cada dia;
                        <br />• Adicionar a data dos estudos;
                        <br />• Registrar observações importantes, como temas estudados ou dificuldades encontradas;
                        <br />• Anotar dúvidas para revisar mais tarde ou discutir com colegas/professores.
                        <br /><br />
                        Tudo isso ajuda a manter uma visão clara e estruturada do seu progresso, promovendo disciplina e foco nos estudos.
                    </p>
                </div>
            </div>
        </div>
    );
}
