"use client";

import Image from "next/image";
import api from "../../api/server";
import Logo from "../../image/icone-medico-caduceu-bastao-de-hermes_874813-14450-removebg-preview.png";
import { MyButton } from "../../components/button";
import { MyInput } from "../../components/input";
import { MyPasswordInput } from "../../components/input-password";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setResetEmail("");
  };

  const login = async (e) => {
    e.preventDefault(); // previne o reload do form
    try {
      const response = await api.post("/login", {
        email,
        senha: password,
      });

      console.log("Login bem-sucedido:", response);

      if (response.status === 200) {
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("token", response.data.token);
        console.log("responselogin", response);
        console.log("id", response.data.user.id);
        window.location.href = "/pagina-inicial";
      }
    } catch (error) {
      if (error.status == 401) {
        Swal.fire({
          icon: "error",
          title: "Erro de login",
          text: "E-mail ou senha incorretos!",
        });
      }
      console.log("Login mal-sucedido:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 to-green-300">
        <div className="w-full max-w-md mx-4 sm:mx-auto rounded-lg mt-3 mb-3 bg-gray-200 p-6 shadow-lg">
          <div className="text-center">
            <Image className="mx-auto w-52 h-36 md:w-72 h-60" alt="Logo Zapido" src={Logo} />
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-black">Faça login da sua conta</h2>
          </div>

          <div className="mt-10">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  Email
                </label>
                <div className="mt-2">
                  <MyInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder=""
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Senha
                  </label>
                  <div className="text-sm">
                    <MyButton
                      className="bg-transparent border-none text-green-500 hover:text-green-400 hover:bg-transparent transition active:opacity-75"
                      onClick={() => setIsModalOpen(true)}
                      type="button"
                    >
                      Esqueceu a senha?
                    </MyButton>
                  </div>
                </div>
                <div className="mt-2">
                  <MyPasswordInput
                    placeholder=""
                    className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline outline-1 outline-white/10 placeholder:text-gray-500"
                    value={password}
                    required
                    autocomplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <MyButton
                  className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  onClick={login}
                  type="submit"
                >
                  Entrar
                </MyButton>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-600">
              Não é membro?{" "}
              <Link href="/criar-conta" className="font-semibold text-green-500 hover:text-green-400">
                Crie sua conta
              </Link>
            </p>
          </div>
        </div>

        {/* Modal de recuperação de senha */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recuperar senha</h3>
              <label htmlFor="reset-email" className="block text-sm text-gray-700 mb-2">
                Digite seu e-mail
              </label>

              <MyInput
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 text-sm focus:border-green-500 focus:outline-none"
                placeholder="seu@email.com"
              />

              <div className="flex justify-start gap-2">
                <MyButton
                  type=""
                  className="px-3 py-1.5"
                  onClick={() => {
                    console.log("Enviar recuperação para:", resetEmail);
                    closeModal();
                  }}
                >
                  Enviar
                </MyButton>

                <MyButton className="px-3 py-1.5" type="" onClick={closeModal} color="red">
                  Cancelar
                </MyButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
