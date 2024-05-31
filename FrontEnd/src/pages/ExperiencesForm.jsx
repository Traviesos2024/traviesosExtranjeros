import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { Uploadfile } from "../components";
import { createExperience } from "../services/experiences.service";
import { Navigate } from "react-router-dom";

export const ExperiencesForm = () => {
  const { id } = useParams(); // Obtener el ID del evento desde los parámetros de la URL
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { user, allUser, setAllUser, bridgeData } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const { register, handleSubmit } = useForm();

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    const customFormData = {
      ...formData,
      image: inputFile[0],
      events: id, // Incluye el ID del evento en los datos del formulario
    };

    setSend(true);
    setRes(await createExperience(customFormData));
    setSend(false);
  };

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (res?.status === 200) {
      setExperiences([...experiences, res.data]);
      bridgeData("ALLUSER");
    }
  }, [res, experiences, bridgeData]);

  if (ok) {
    return <Navigate to="/experiences" />;
  }

  return (
    <div>
      <div className="form-wrap">
        <h1>Crear experiencia</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              {...register("name", { required: true })}
            />
            <label htmlFor="name" className="custom-placeholder">
              Nombre
            </label>
          </div>
          <div className="description_container form-group">
            <input
              className="input_user"
              type="text"
              id="description"
              name="description"
              placeholder="Descripción"
              {...register("description", { required: true })}
            />
            <label htmlFor="description" className="custom-placeholder">
              Descripción
            </label>
          </div>
          <div>
            <Uploadfile required />
          </div>
          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              {send ? "Cargando..." : "Aceptar"}
            </button>
          </div>
        </form>
      </div>
      <ul>
        {experiences.map((experience) => (
          <li key={experience._id}>
            <h3>{experience.name}</h3>
            <img
              src={experience.image}
              alt={experience.name}
              style={{ maxWidth: "200px" }}
            />
            <p>{experience.description}</p>
            <p>Creada por: {experience.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const ExperiencesForm = ({ idExperience }) => {
//   //! 1) crear los estados
//   const [res, setRes] = useState({});
//   const [send, setSend] = useState(false);
//   const [ok, setOk] = useState(false);
//   const { user, allUser, setAllUser, bridgeData } = useAuth();
//   const [experiences, setExperiences] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [resEvents, setResEvents] = useState({});
//   // const [selectedEvent, setSelectedEvent] = useState(null);

//   //! 2) llamada al hook de react hook form
//   const { register, handleSubmit, setValue } = useForm();

//   //! 3) la funcion que gestiona los datos del formulario
//   const formSubmit = async (formData) => {
//     const inputFile = document.getElementById("file-upload").files;

//     //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
//     if (inputFile.length !== 0) {
//       // si es diferente a 0 es que hay algo dentro de files
//       const customFormData = {
//         ...formData,
//         image: inputFile[0],
//         events: idEvent,
//       };
//       //llamada al backend
//       setSend(true);
//       setRes(await createExperience(customFormData));
//       setSend(false);
//     } else {
//       // si no hay imagen solo hago una copia del formData
//       const customFormData = {
//         ...formData,
//       };
//       //llamada al backend
//       setSend(true);
//       setRes(await createExperience(customFormData));
//       setSend(false);
//     }
//   };

//   //! 4) useEffects que gestionan la repuesta y manejan los errores
//   useEffect(() => {
//     useErrorRegister(res, setRes, setOk);
//     // si la res es ok llamamos a la funcion puente del contexto y le pasamos el parámetro ALLUSER
//     if (res?.status === 200) {
//       setExperiences([...experiences, res.data]);
//       bridgeData("ALLUSER");
//     }
//   }, [res, experiences, bridgeData]);

//   useEffect(() => {
//     console.log("allUser 🤡", allUser);
//   }, [allUser]);

//   useEffect(() => {
//     (async () => {
//       setEvents(await getAll());
//     })();
//   }, []);

//   // Llama al hook directamente en el componente
//   useErrorEventDetalle(resEvents, setResEvents, setEvents);

//   useEffect(() => {
//     console.log("los eventos", events);
//   }, [events]);

//   const handleEventChange = (e) => {
//     setSelectedEvent(e.target.value);
//   };

//   const experiencesEvent = experiences.filter((experience) =>
//     experience.events && experience.events.includes(selectedEvent)
//   );

//   //! 5) estados de navegación
//   if (ok) {
//     return <Navigate to="/experiences" />;
//   }

//   return (
//     <div>
//       <div className="form-wrap">
//         <div>
//           <h1>Crear experiencia</h1>
//           <form onSubmit={handleSubmit(formSubmit)}>
//             <div className="user_container form-group">
//               <input
//                 className="input_user"
//                 type="text"
//                 id="name"
//                 name="name"
//                 autoComplete="false"
//                 placeholder="Vinos"
//                 {...register("name", { required: true })}
//               />
//               <label htmlFor="custom-input" className="custom-placeholder">
//                 Nombre
//               </label>
//             </div>
//             <div className="description_container form-group">
//               <input
//                 className="input_user"
//                 type="texto"
//                 id="description"
//                 name="description"
//                 autoComplete="false"
//                 placeholder="Fuimos de vinos a Honolulu"
//                 {...register("description", { required: true })}
//               />
//               <label htmlFor="custom-input" className="custom-placeholder">
//                 Descripción
//               </label>
//             </div>

//             <div>
//               <Uploadfile required />
//             </div>

//             <div className="btn_container">
//               <button
//                 className="btn"
//                 type="submit"
//                 disabled={send}
//                 style={{ background: send ? "#49c1a388" : "#2f7a67" }}
//               >
//                 {send ? "Cargando..." : "Aceptar"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <ul>
//         {experiences.map((experience) => (
//           <li key={experience._id}>
//             <h3>{experience.name}</h3>
//             <img
//               src={experience.image}
//               alt={experience.name}
//               style={{ maxWidth: "200px" }}
//             />
//             <p>{experience.description}</p>
//             <p>Creada por: {experience.createdBy}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
