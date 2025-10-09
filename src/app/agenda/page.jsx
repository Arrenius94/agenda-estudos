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
import Swal from "sweetalert2";
import { confirmDialog } from "../../components/messages/index";
import api from "../../api/server";
import { Pagination, Stack } from "@mui/material";

export default function Agenda() {
  const [search, setSearch] = useState("");
  const [annotation, setAnnotation] = useState([]);
  const [amountAnnotation, setAmountAnnotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [termo, setTermo] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      getTasks(null, 1);
    }
  }, [search]);

  const getTasks = async (e, page = 1) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);

    try {
      const response = await api.get(
        `/tarefas?user_id=${localStorage.getItem("id")}`,
        { params: { search, page } }
      );
      setAnnotation(response.data.tarefas);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTermo(search);
      setAmountAnnotation(response.data.total);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    } finally {
      setLoading(false);
    }
  };

  const deletItem = async (e, id) => {
    e.preventDefault();

    const result = await confirmDialog();
    if (result?.isConfirmed) {
      setLoading(true);
      try {
        const response = await api.delete(`/tarefas/${id}`);
        if (response.status === 204) {
          Swal.fire({
            title: "Excluído!",
            text: "Seu arquivo foi excluído.",
            icon: "success",
          });

          await getTasks(null, currentPage);
        }
      } catch (error) {
        console.error("Erro ao deletar", error);
        await Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir.",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatarDataBR = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHorasParaRelogio = (horas) => {
    const h = Math.floor(horas);
    const m = Math.round((horas - h) * 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
        </div>
      )}

      {/* Título */}
      <div className="flex justify-center items-center mt-10">
        <Image
          className=""
          src={List}
          alt="Logo-MED"
          title="Logo-Med"
          width={45}
          height={30}
        />
        <h1 className=" ml-2 font-bold text-3xl md:text-5xl">Anotações ☺</h1>
      </div>

      {/* Container principal */}
      <div className="max-w-96 mx-4 sm:max-w-[40rem] sm:mx-auto md:max-w-[48rem] lg:max-w-[1250px] xl:max-w-[100rem] mx-auto rounded-md mt-10 shadow-md overflow-hidden">
        {/* Cabeçalho */}
        <header className="bg-zinc-800 text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/criar-estudo"
              className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 transition active:opacity-75 cursor-pointer flex items-center gap-2"
            >
              <FormatListBulletedIcon fontSize="small" />
              Novo Estudo
            </Link>
          </div>
        </header>

        {/* Campo de busca */}
        <div className="p-4 flex items-center gap-2">
          <MyInput
            className="w-[21rem] sm:w-full md:w-full lg:w-full xl:w-full"
            type="text"
            placeholder="Digite para pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MyButton color="green" onClick={getTasks}>
            <SearchIcon fontSize="small" /> Pesquisar
          </MyButton>
        </div>

        <div className="px-4 py-2 text-sm text-zinc-700">
          {termo ? (
            <>
              Total de tarefas encontradas:{" "}
              <span className="font-semibold">{amountAnnotation}</span>
            </>
          ) : (
            <>
              Total de tarefas:{" "}
              <span className="font-semibold">{amountAnnotation}</span>
            </>
          )}
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-96 mx-4 sm:max-w-[40rem] sm:mx-auto md:max-w-[48rem] lg:max-w-[1250px] xl:max-w-[100rem] mx-auto shadow-md overflow-hidden bg-white mt-6">
        {/* Cabeçalho da tabela */}
        <div className="bg-zinc-800 text-white px-4 py-3 flex items-center gap-2">
          <span className="text-lg font-semibold flex items-center gap-2">
            <FormatListBulletedIcon fontSize="small" />
            Anotações Dos Estudos
          </span>
        </div>

        {/* Corpo da tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-collapse">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2 font-semibold text-center">Título</th>
                <th className="px-4 py-2 font-semibold text-center">
                  Descrição
                </th>
                <th className="px-4 py-2 font-semibold text-center">
                  Data da Conclusão
                </th>
                <th className="px-4 py-2 font-semibold text-center">
                  Horas de Estudos
                </th>
                <th className="px-4 py-2 font-semibold text-center">
                  Visualizar
                </th>
                <th className="px-4 py-2 font-semibold text-center">Editar</th>
                <th className="px-4 py-2 font-semibold text-center">Excluir</th>
              </tr>
            </thead>
            <tbody className="ml-3">
              {annotation.map((item, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="px-4 py-3 align-middle">{item.titulo}</td>
                  <td className="px-4 py-3 align-middle">{item.descricao}</td>
                  <td className="px-4 py-3 align-middle">
                    {formatarDataBR(item.data_conclusao)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {formatarHorasParaRelogio(item.horas_estudo)}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link href={`/criar-estudo/?${item.id}&view`} className="">
                      <VisibilityIcon
                        fontSize="large"
                        className="text-blue-500 hover:text-blue-400 active:opacity-75 cursor-pointer"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link href={`/criar-estudo/?${item.id}&edit`}>
                      <EditIcon
                        fontSize="large"
                        className="text-green-500 hover:text-green-400 transition active:opacity-75 cursor-pointer bg-transparent"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        deletItem(e, item.id);
                      }}
                      className="inline-block"
                      title="Excluir"
                    >
                      <DeleteForeverIcon
                        fontSize="large"
                        className="text-red-500 hover:text-red-400 transition active:opacity-75 cursor-pointer bg-transparent"
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex justify-center my-6">
          <Stack spacing={2} className="mt-6 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => getTasks(null, value)}
              color="standard"
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
