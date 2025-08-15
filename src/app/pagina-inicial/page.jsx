"use client";

import Image from "next/image";
import Cerebro from "../../image/cerebro.png.png";
import Calendar from "../../image/organizacao.png.png";
import Progress from "../../image/acompanhamento.png.png";
import Anotattions from "../../image/anotacao.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sua rotina de estudos, simplificada</h1>
          <p className="text-gray-600 mb-6">
            A Agenda de Estudos ajuda você a manter o foco, organizar suas tarefas e acompanhar seu progresso de forma
            prática e visual.
          </p>
        </div>
        {/* <div className="md:w-1/2 flex justify-center">
          <Image src={Logo} alt="Estudante organizando agenda" className="rounded-lg shadow-lg max-w-sm" />
        </div> */}
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <Image src={Calendar} width={75} height={75} className="mx-auto mb-4" alt="Organização" />
            <h3 className="font-semibold text-lg mb-2">Organização</h3>
            <p className="text-gray-600">Registre e planeje suas horas de estudo facilmente.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <Image src={Progress} width={75} height={75} className="mx-auto mb-4" alt="Progresso" />
            <h3 className="font-semibold text-lg mb-2">Acompanhamento</h3>
            <p className="text-gray-600">Veja seu desempenho e evolução ao longo do tempo.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <Image src={Anotattions} width={75} height={75} className="mx-auto mb-4" alt="Anotações" />
            <h3 className="font-semibold text-lg mb-2">Anotações</h3>
            <p className="text-gray-600">Guarde suas observações e dúvidas para revisar depois.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
