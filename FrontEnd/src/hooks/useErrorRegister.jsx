import Swal from 'sweetalert2/dist/sweetalert2.all.js'

export const useErrorRegister = (res, setRes, setOk) => {
    //!--- si la respuesta es ok --> res.status
    //!--- el error ---> res.response.status

    // status 200 : todo ok
    if (res?.status == 200) {
        //* guardo la data en el localStorage
        const dataToString = JSON.stringify(res);
        localStorage.setItem('data', dataToString);

        //* setear el register ok
        setOk(() => true)

        //* lanzo swal
        Swal.fire({
            title: 'Registro hecho!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
        });
        
        //*  seteo la respuesta al estado inicial
        setRes({});
    }

    // status 409 : user ya registrado
    if (res?.response?.status == 409) {
        Swal.fire({
            title: 'El email no es válido',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({});
    }

    // status 404 : contraseña formato erroneo
    if (res?.response?.data?.includes('validation failed: password')) {
        Swal.fire({
            title: 'Min 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
        });
        setRes({});
    }

    // status 500 : internal server error
    if (res?.response?.status == 500) {
        Swal.fire({
            title: 'internal server error 500, inténtalo de nuevo',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
        });
        setRes({});
    }
    
}
