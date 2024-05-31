import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorEvent = (resEvent, setResEvent, setEventById) => {
  // 200 --> lo que vamos es hacer setear la data en el setData
  if (resEvent?.status == 200) {
    console.log("esta todo correcto");
    setEventById(resEvent.data);
    setResEvent(() => ({}));
  }

  if (resEvent?.response?.status == 404 || resEvent?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error en la app, vuelva mas tarde",
      showConfirmButton: false,
      timer: 1500,
    });
    setResEvent(() => ({}));
  }
  /// para el resto de errores lanzamos un modal diciendo tenemos un error

  // res.response.status
};
