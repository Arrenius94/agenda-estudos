"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import api from "../../api/server";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const loggedUser = async () => {
    try {
      const response = await api.get(`/me`);
      setUserId(response.data.id);
      console.log("RESPONSE USER LOGADO", response.data);
      console.log("ID DO USER", response.data.id);
    } catch (error) {
      console.error("Erro ao buscar usuário logado", error);
    }
  };

  useEffect(() => {
    loggedUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-zinc-900 text-white transition">
      <div className="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-7xl">
        <div>Agenda De Estudos :)</div>

        <nav>
          <ul className="flex items-center justify-center gap-8">
            <li>
              <Link href={`/pagina-inicial/`} className="hover:text-green-500 transition active:opacity-75">
                Home
              </Link>
            </li>
            <li>
              <Link href="/agenda" className="hover:text-green-500 transition active:opacity-75">
                Agenda
              </Link>
            </li>
            <li className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="bg-transparent border-none text-white hover:text-green-500 transition active:opacity-75 cursor-pointer"
              >
                Perfil
              </button>
              {showMenu && (
                <ul className="absolute right-0 mt-2 bg-zinc-800 rounded shadow-lg py-2 w-40 z-10">
                  <li>
                    <Link href={`/editar-perfil/${userId}`} className="block px-4 py-2 hover:bg-zinc-700 transition">
                      Editar Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-700 transition bg-transparent border-none cursor-pointer"
                    >
                      Sair
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
