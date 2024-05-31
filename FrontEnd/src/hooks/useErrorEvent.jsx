import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useErrorEvent = (res, setRes, setData) => {
  // 200 --> lo que vamos es hacer setear la data en el setData
  if (res?.status == 200) {
<<<<<<< HEAD
=======
    // const filteredEvents = res.data.allEvent.filter((event) =>
    //   event.cities.some((city) => city.name === cityName)
    // );

>>>>>>> 953b4c46e4e142a9fca083a74930c68c4d3c1ca8
    console.log("esta todo correcto");
    setData(res.data);
    setRes(() => ({}));
  }

  if (res?.response?.status == 404 || res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error en la app, vuelva mas tarde",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
<<<<<<< HEAD
  }
};
=======
  }};
>>>>>>> 953b4c46e4e142a9fca083a74930c68c4d3c1ca8
