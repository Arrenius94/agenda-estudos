import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import MyReactComponent from "./MyReactComponent";
// import iconLoading from "./processing.gif";

const MySwal = withReactContent(Swal);

export const confirmDialog = () => {
  return MySwal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, apague!",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton:
        "w-32 bg-red-500 text-black text-sm py-2 rounded hover:bg-red-400 transition active:opacity-75 focus:outline-none",
      cancelButton:
        "w-32 bg-green-500 text-black text-sm py-2 rounded hover:bg-green-400 transition active:opacity-75 focus:outline-none ml-2",
      title: "text-black",
      content: "text-black",
    },
    buttonsStyling: false,
  });
};
