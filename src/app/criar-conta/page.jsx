"use client";

import Image from "next/image";
import LogoConta from "../../image/criar-conta.png";
import { MyInput } from "../../components/input";
import { useState } from "react";
import { MyButton } from "../../components/button";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRouter } from "next/navigation";
import { MyPasswordInput } from "../../components/input-password";
import Swal from "sweetalert2";
import api from "../../api/server";

export default function CreateLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const backList = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      nome: name,
      email: email,
      senha: password,
    };

    try {
      const response = await api.post(`/users`, formData);
      if (response.status === 201) {
        await Swal.fire({
          title: "Criado!",
          text: "Sua conta foi criada!",
          icon: "success",
        });

        setName("");
        setEmail("");
        setPassword("");

        router.push("/login");
      }
    } catch (error) {
      await Swal.fire({
        title: "Erro!",
        text: "Erro ao criar conta. Tente novamente!",
        icon: "error",
      });
      console.error("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
        </div>
      )}
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-300">
        <div className="w-[90vw] max-w-md mt-10 rounded-lg mb-40 bg-gray-200 p-4 sm:p-6 shadow-lg">
          <div className="text-center">
            <Image width={200} height={160} alt="logo-criar-conta" className="mx-auto" src={LogoConta} />
          </div>
          <h1 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-black">Crie Sua Conta! :)</h1>

          <div className="mt-5 flex flex-col gap-3">
            <MyInput
              disabled={""}
              className="rounded-md w-full"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MyInput
              disabled={""}
              className="rounded-md w-full"
              placeholder="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Senha"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <footer className="bg-zinc-500 text-white px-4 py-4 mt-6 rounded-md flex flex-col sm:flex-row gap-3 justify-between">
            <MyButton
              disabled={""}
              className="w-full sm:w-auto px-3 py-2 text-sm"
              color="green"
              type="submit"
              onClick={createUser}
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
        </div>
      </main>
    </>
  );
}
