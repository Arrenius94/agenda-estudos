"use client";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Image from "next/image";
import List from "../../image/lista-png.png";
import Link from "next/link";
import { MyButton } from "../../components/button";
import { MyInput } from "../../components/input";
import { useEffect, useState } from "react";
import api from "../../api/server";

export default function Agenda() {
  const [search, setSearch] = useState("");
  const [termo, setTermo] = useState("");
  const [annotation, setAnnotation] = useState([]);
  const notations = [
    {
      titulo: "Rins",
      descricao: "Cirurgia rins",
      dataConclusao: "15/04/2025",
      horasEstudo: "4:00",
    },
    {
      titulo: "Coração",
      descricao: "Estudo de cardiologia",
      dataConclusao: "20/04/2025",
      horasEstudo: "3:30",
    },
    {
      titulo: "Pulmão",
      descricao: "Anatomia pulmonar",
      dataConclusao: "25/04/2025",
      horasEstudo: "2:45",
    },
  ];

  useEffect(() => {
    if (!termo) {
      getTasks();
    }
  }, [termo]);

  const getTasks = async (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }

    try {
      let formData = {
        search: termo,
      };

      const response = await api.get(`/tarefas`, { params: formData });
      console.log("GET", response.data);
      // if (response.data) {
      //   return;
      // }
      setAnnotation(response.data);
    } catch (error) {
      if (error.status == 401) {
        alert("entrei");
      }
    }
  };

  console.log("Annotation:", annotation);

  const formatarDataBR = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  };

  const formatarHorasParaRelogio = (horas) => {
    const h = Math.floor(horas);
    const m = Math.round((horas - h) * 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <div className="">
      {/* Título */}
      <div className="flex justify-center items-center mt-10">
        <Image src={List} alt="Logo-MED" title="Logo-Med" width={45} height={30} />
        <h1 className="ml-2 font-bold text-5xl">Anotações ☺</h1>
      </div>

      {/* Container principal */}
      <div className="rounded-md shadow-md overflow-hidden mt-10 w-full max-w-[1250px] mx-auto">
        {/* Cabeçalho */}
        <header className="bg-zinc-800 text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/criar-estudo"
              className="p-3 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-2"
            >
              <FormatListBulletedIcon fontSize="small" />
              Novo Estudo
            </Link>
          </div>
        </header>

        {/* Campo de busca */}
        <div className="p-4 flex items-center gap-2">
          {/* <input
                        className='border border-black rounded focus:border-green-500 text-sm p-3 w-full bg-white'
                        placeholder='Digite para pesquisar'
                        type="text"
                    /> */}
          <MyInput
            className="w-full"
            type="text"
            placeholder="Digite para pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></MyInput>

          <MyButton type="submit" color="green">
            <SearchIcon fontSize="small" /> Pesquisar
          </MyButton>
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
              {annotation.map((nota, index) => {
                console.log(`Nota ${index}:`, nota);
                return (
                  <tr key={index} className="border-b text-center">
                    <td className="px-4 py-3 align-middle">{nota.titulo}</td>
                    <td className="px-4 py-3 align-middle">{nota.descricao}</td>
                    <td className="px-4 py-3 align-middle"> {formatarDataBR(nota.data_conclusao)}</td>
                    <td className="px-4 py-3 align-middle">{formatarHorasParaRelogio(nota.horas_estudo)}</td>
                    <td className="px-4 py-3 align-middle">
                      <button>
                        <VisibilityIcon
                          fontSize="large"
                          className="text-blue-500 hover:text-blue-400 active:opacity-75 cursor-pointer"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <button>
                        <EditIcon
                          fontSize="large"
                          className="text-green-500 hover:text-green-400 transition active:opacity-75 cursor-pointer"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <button>
                        <DeleteForeverIcon
                          fontSize="large"
                          className="text-red-500 hover:text-red-400 transition active:opacity-75 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
