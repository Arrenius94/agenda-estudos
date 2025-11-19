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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().min(1, "O email é obrigatório!").email("Email inválido!"),
    senha: z.string().min(1, "A senha é obrigatória!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function CreateLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const createUser = async (data) => {
    setLoading(true);
    const formData = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    };

    try {
      const response = await api.post(`/users`, formData);
      if (response.status === 201) {
        await Swal.fire({
          title: "Criado!",
          text: "Sua conta foi criada!",
          icon: "success",
        });
        reset();
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

  const onError = async (errors) => {
    console.log(errors);
    if (Object.keys(errors).length > 0) {
      const err = Object.values(errors)[0];
      await Swal.fire({
        title: "Erro de validação",
        text: err.message,
        icon: "error",
      });
    }
  };

  const backList = (e) => {
    e.preventDefault();
    router.push("/login");
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
            <Image
              width={200}
              height={160}
              alt="logo-criar-conta"
              className="mx-auto"
              src={LogoConta}
            />
          </div>
          <h1 className="text-center text-xl sm:text-2xl font-bold tracking-tight text-black">
            Crie Sua Conta! :)
          </h1>

          <form
            className="mt-5 flex flex-col gap-3"
            onSubmit={handleSubmit(createUser, onError)}
          >
            <MyInput
              disabled={""}
              className="rounded-md w-full"
              placeholder="Nome"
              type="text"
              {...register("name")}
            />
            <MyInput
              disabled={""}
              className="rounded-md w-full"
              placeholder="Email"
              type="text"
              {...register("email")}
            />
            <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Senha"
              autoComplete="current-password"
              {...register("password")}
            />
            <MyPasswordInput
              className="rounded-md w-full"
              placeholder="Confirme a Senha"
              {...register("confirmPassword")}
              autoComplete="current-password"
            />
            <footer className="bg-zinc-500 text-white px-4 py-4 mt-6 rounded-md flex flex-col sm:flex-row gap-3 justify-between">
              <MyButton
                disabled={""}
                className="w-full sm:w-auto px-3 py-2 text-sm"
                color="green"
                type="submit"
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
          </form>
        </div>
      </main>
    </>
  );
}
