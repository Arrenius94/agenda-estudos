"use client";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { InputFloatingTime } from "../../components/input-floating-time";
import { InputFloatingDate } from "../../components/input-floating-date";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MyButton } from "../../components/button";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { MyInput } from "../../components/input";
import { MyTextArea } from "../../components/text-area";
import api from "../../api/server";
import Swal from "sweetalert2";

export default function CeateStudy() {
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [observation, setObservation] = useState("");
  const [paramView, setParamView] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const backList = (e) => {
    e.preventDefault();
    router.push("/agenda");
  };

  useEffect(() => {
    loadparam();
  }, []);

  const loadparam = () => {
    let param = location.search;
    let removeMark = param.replace("?", "");
    let format = removeMark.split("&");
    setId(format[0]);
    setParamView(format[1]);
    if (format[1] === "view" || format[1] === "edit") {
      searchTask(format[0]);
    }
  };

  const hoursConverte = (hour) => {
    const [h, m] = hour.split(":").map(Number);
    return h + m / 60;
  };

  const formartHours = (value) => {
    const float = parseFloat(value);
    const hours = Math.floor(float);
    const minutes = Math.round((float - hours) * 60);
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const updateAnnotation = async () => {
    setLoading(true);
    let form = {
      titulo: title,
      descricao: description,
      data_conclusao: date,
      horas_estudo: hoursConverte(hour),
      observacoes: observation,
      users_id: localStorage.getItem("id"),
    };

    try {
      const response = await api.put(`/tarefas/${id}`, form);
      if (response.status === 200) {
        await Swal.fire({
          title: "Editado!",
          text: "Sua anotação foi editada.",
          icon: "success",
        });
        setTimeout(() => {
          router.push("/agenda");
        }, 1000);
      }
    } catch (error) {
      const isEmptyObject = error && Object.keys(error).length === 0 && error.constructor === Object;
      if (isEmptyObject) {
        await Swal.fire({
          title: "Erro!",
          text: "Erro ao criar tarefa. Tente novamente!",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      const errorMessage = error?.response?.data?.message || error?.message || "Erro desconhecido ao criar tarefa.";
      await Swal.fire({
        title: "Erro!",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchTask = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/tarefas/${id}`);
      if (response.status === 200) {
        setTitle(response.data.titulo);
        setDescription(response.data.descricao);
        setHour(formartHours(response.data.horas_estudo));
        setDate(response.data.data_conclusao);
        setObservation(response.data.observacoes);
      }
    } catch (error) {
      // erro ao buscar tarefa
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      titulo: title,
      descricao: description,
      data_conclusao: date,
      horas_estudo: hoursConverte(hour),
      observacoes: observation,
      users_id: localStorage.getItem("id"),
    };

    if (paramView === "edit") {
      await updateAnnotation(formData);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/tarefas`, formData);

      if (response.status === 201) {
        await Swal.fire({
          title: "Criado!",
          text: "Sua anotação foi criada.",
          icon: "success",
        });

        setTitle("");
        setDescription("");
        setDate("");
        setHour("");
        setObservation("");

        router.push("/agenda");
      }
    } catch (error) {
      const messageBack = error.data?.error || "Erro em criar tarefa!";
      await Swal.fire({
        title: "Erro!",
        text: messageBack,
        icon: "error",
      });

      const isEmptyObject = error && Object.keys(error).length === 0 && error.constructor === Object;
      if (isEmptyObject) {
        await Swal.fire({
          title: "Erro!",
          text: "Erro ao criar tarefa. Tente novamente!",
          icon: "error",
        });
        setLoading(false);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
        </div>
      )}
      <div className="max-w-96 mx-4 sm:max-w-[40rem] sm:mx-auto md:max-w-[48rem] lg:max-w-[1250px] xl:max-w-[100rem] rounded-md shadow-md overflow-hidden mt-10 w-full mx-auto">
        {/*Cabeçalho*/}
        <header className="bg-zinc-800 text-white px-4 py-4">
          <div>
            <FormatListBulletedIcon fontSize="small" className="mb-0.5" /> Cadastrar
          </div>
        </header>

        <form action="" onSubmit={(e) => onSignIn(e)}>
          {/*Campo de Cadastro*/}
          <div className="flex flex-col md:flex-row md:flex-nowrap md:gap-4 md:p-2">
            <MyInput
              type="text"
              placeholder="Titulo *"
              value={title}
              disabled={paramView === "view"}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 min-w-[200px] max-w-[350px] mt-5 ml-6 mb-3 p-3 bg-white"
            />

            <MyInput
              type="text"
              placeholder="Descrição"
              value={description}
              disabled={paramView === "view"}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-5 ml-6 md:mt-5 md:ml-1 md:mb-3 p-3 flex-1 min-w-[200px] max-w-[350px] bg-white"
            />

            <InputFloatingTime
              id="hora-tarde"
              label="Horas de Estudo"
              value={hour}
              className="mt-6 ml-6 md:mt-4 md:ml-1 md:mb-3 h-12 flex-1 min-w-[130px] max-w-[150px] "
              disabled={paramView === "view"}
              onChange={(e) => setHour(e.target.value)}
            />

            <InputFloatingDate
              id="data"
              className="mt-6 ml-6 md:mt-4 md:ml-1 md:mb-3h-12 flex-1 min-w-[135px] max-w-[155px] "
              label="Data de Conclusão"
              value={date}
              disabled={paramView === "view"}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="ml-4 md:ml-6 p-2 max-w-[46rem]">
            {/* <textarea rows={8} className='w-96  p-1.5 border border-black rounded' placeholder='OBSERVAÇÕES' name="" id=""></textarea> */}
            <MyTextArea
              className="max-w-[22rem] sm:max-w-[44rem] md:max-w-[60rem]"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              disabled={paramView === "view"}
              placeholder="OBSERVAÇÕES"
              rows={8}
            />
          </div>

          <footer className="bg-zinc-200 text-white px-4 py-4 flex flex-wrap gap-4 p-2">
            <MyButton disabled={paramView === "view"} className="ml-5" color="green" type="submit">
              <ArrowUpwardIcon fontSize="small" /> Salvar{" "}
            </MyButton>
            <MyButton className="ml-5" onClick={backList} color="red" type="button">
              {paramView === "view" ? <KeyboardBackspaceIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
              {paramView === "view" ? "Voltar" : "Cancelar"}
            </MyButton>
          </footer>
        </form>
      </div>
    </div>
  );
}
