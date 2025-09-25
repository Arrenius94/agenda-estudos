"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import LogoConta from "../../../image/userLogado.png";
import { MyInput } from "../../../components/input";
import { useEffect, useState } from "react";
import { MyButton } from "../../../components/button";
import { confirmDialog } from "../../../components/messages";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRouter } from "next/navigation";
import { MyPasswordInput } from "../../../components/input-password";
import Swal from "sweetalert2";
import api from "../../../api/server";

export default function EditPerfil() {
  const [editName, setEditName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");

  const router = useRouter();
  const backList = (e) => {
    e.preventDefault();
    router.push("/pagina-inicial");
  };

  useEffect(() => {
    if (id) {
      console.log("ID recebido:", id);
      viewUser(id);
    }
  }, [id]);

  const viewUser = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      if (response.status === 200) {
        console.log("RESPONSE USER", response.data);
        const user = response.data;
        setName(response.data.nome);
        setEditName(response.data.nome);
      }
    } catch (error) {
      console.error(error);

      const isEmptyObject = error && Object.keys(error).length === 0 && error.constructor === Object;
      if (isEmptyObject) {
        return;
      }
      const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido ao criar tarefa.";
      console.error("Erro ao criar tarefa:", errorMessage);
      console.error("error");
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const result = await confirmDialog();
    if (result?.isConfirmed) {
      try {
        const response = await api.delete(`/users/${id}`);
        if (response.status === 204) {
          await Swal.fire({
            title: "Conta deletada!",
            text: "Sua conta foi deletada com sucesso.",
            icon: "success",
          });
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const changePassword = async () => {
    let form = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const response = await api.put(`/users/${id}/change-password`, form);
      if (response.status === 200) {
        await Swal.fire({
          title: "Editado!",
          text: "Sua senha foi alterada.",
          icon: "success",
        });

        SetOldPassword("");
        SetNewPassword("");
      }
    } catch (error) {
      console.log("error", error);
      const messageBack = error.data?.error || "Erro em alterar senha!";
      Swal.fire({
        title: "Erro!",
        text: messageBack,
        icon: "error",
      });
    }
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white-900 to-white-300">
        <div className="w-[90vw] max-w-md mt-10 rounded-lg mb-40 bg-gray-200 p-4 sm:p-6 shadow-lg">
          <div className="text-center">
            <Image width={300} height={260} alt="logo-criar-conta" className="mx-auto" src={LogoConta} />
          </div>
          <h1 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-black">Olá {name} :)</h1>

          <div className="mt-5 flex flex-col gap-3">
            <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Senha Atual"
              value={oldPassword}
              required
              autoComplete="current-password"
              onChange={(e) => SetOldPassword(e.target.value)}
            />
            <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Nova Senha"
              value={newPassword}
              required
              autoComplete="current-password"
              onChange={(e) => SetNewPassword(e.target.value)}
            />
            {/* <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Senha"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
          </div>

          <footer className="bg-zinc-500 text-white px-4 py-4 mt-6 rounded-md flex flex-col sm:flex-row gap-3 justify-between">
            <MyButton
              disabled={""}
              className="w-full sm:w-auto px-3 py-2 text-sm"
              color="green"
              type="button"
              onClick={changePassword}
            >
              <ArrowUpwardIcon fontSize="small" /> Salvar
            </MyButton>
            <MyButton
              disabled={""}
              className="w-full sm:w-auto px-3 py-2 text-sm"
              onClick={backList}
              color="red"
              type="button"
            >
              <CancelIcon fontSize="small" /> Cancelar
            </MyButton>
          </footer>
          <div className="mt-4">
            <MyButton
              className="w-full px-3 py-2 text-sm bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              type="button"
              onClick={deleteUser}
            >
              <DeleteForeverIcon className="mb-1" fontSize="small" />
              Deletar conta
            </MyButton>
          </div>
        </div>
      </main>
    </>
  );
}
