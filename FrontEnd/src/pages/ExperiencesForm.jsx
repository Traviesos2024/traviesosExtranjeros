// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import "./Register.css";
// import { useErrorRegister } from "../hooks";
// import { useAuth } from "../context/authContext";
// import { Uploadfile } from "../components";
// import { createExperience, toggleEvent } from "../services/experiences.service";
// import { Navigate } from "react-router-dom";
// import { getAll } from "../services/events.service";
// import { getAllExperiences} from "../services/experiences.service";
// import { useErrorEventDetalle } from "../hooks";
// import { useErrorExperience } from "../hooks/useErrorExperience";



// export const ExperiencesForm = ({idExperience}) => {
//   //! 1) crear los estados

//   const [res, setRes] = useState({});
//   const [send, setSend] = useState(false);
//   const [ok, setOk] = useState(false);
//   const {user, allUser, setAllUser, bridgeData } = useAuth();
//   const [experiences, setExperiences] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [resEvents, setResEvents] = useState({});
//   const [selectedEvent, setSelectedEvent] = useState(null);


//   //! 2) llamada al hook de react hook form

//   const { register, handleSubmit, setValue } = useForm();

  // // const onToggleEvent = async (event) => {
  // //   try {
  // //     const res = await toggleEvent(idExperience);
  // //     console.log("res", res);
  // //     res.status == 200 && setEvents(res.data.allEvent);
      
  // //   } catch (error) {
  // //     console.error("Error toggling like:", error);

  // //   }
  // // };

  // // console.error("setEvents", setEvents);


//   //! 3) la funcion que gestiona los datos del formulario

//   const formSubmit = async (formData) => {
//     const inputFile = document.getElementById("file-upload").files;

//     //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
//     if (inputFile.lenght != 0) {
//       // si es diferente a 0 es que hay algo dentro de files
//       const customFormData = {
//         ...formData,
//         image: inputFile[0],
//         events: selectedEvent,
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
//     if (res?.status == 200) {
//       setExperiences([...experiences, response.data]);
//       bridgeData("ALLUSER");
//     }
//   }, [res]);

//   useEffect(() => {
//     console.log("allUser 🤡", allUser);
//   }, [allUser]);

//   useEffect(() => {
//     (async () => {
//       setEvents(await getAll());
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorEventDetalle(resEvents, setResEvents, setEvents);
//   }, [resEvents]);

 

//   useEffect(() => {
//     console.log("los eventos", events);
//   }, [events]);

//   const handleEventChange = (e) => {
//     setSelectedEvent(e.target.value);
//   };

//   const experiencesEvent = experiences.filter(experience => 
//     experience.events && experience.events.includes(selectedEvent)
//   );


//   //! 5) estados de navegacion

//   if (ok) {
//     return <Navigate to="/experiences" />;
//   }

//   return (
//     <div>
//       <div className="form-wrap">
//         <div>
//           <h1>Crear experiencia</h1>
//           {/* <div onClick={onToggleEvent} id="favorite-icon"> */}

//           {/* <select onChange={onToggleEvent} value={selectedEvent}>
//         <option value="">Seleccione un evento</option>
//         {events.map(event => (
//           <option key={event._id} value={event._id}>
//             {event.name}
//           </option>
//         ))}
//       </select> */}

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
      
//       </div>
//     // </div>
//   );
// };


import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { Uploadfile } from "../components";
import { createExperience, toggleEvent } from "../services/experiences.service";
import { Navigate } from "react-router-dom";
import { getAll } from "../services/events.service";
import { getAllExperiences } from "../services/experiences.service";
import { useErrorEventDetalle } from "../hooks";
import { useErrorExperience } from "../hooks/useErrorExperience";

export const ExperiencesForm = ({ idExperience }) => {
  //! 1) crear los estados
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { user, allUser, setAllUser, bridgeData } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [events, setEvents] = useState([]);
  const [resEvents, setResEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  //! 2) llamada al hook de react hook form
  const { register, handleSubmit, setValue } = useForm();

  //! 3) la funcion que gestiona los datos del formulario
  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
    if (inputFile.length !== 0) {
      // si es diferente a 0 es que hay algo dentro de files
      const customFormData = {
        ...formData,
        image: inputFile[0],
        events: selectedEvent,
      };
      //llamada al backend
      setSend(true);
      setRes(await createExperience(customFormData));
      setSend(false);
    } else {
      // si no hay imagen solo hago una copia del formData
      const customFormData = {
        ...formData,
      };
      //llamada al backend
      setSend(true);
      setRes(await createExperience(customFormData));
      setSend(false);
    }
  };

  //! 4) useEffects que gestionan la repuesta y manejan los errores
  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    // si la res es ok llamamos a la funcion puente del contexto y le pasamos el parámetro ALLUSER
    if (res?.status === 200) {
      setExperiences([...experiences, res.data]);
      bridgeData("ALLUSER");
    }
  }, [res, experiences, bridgeData]);

  useEffect(() => {
    console.log("allUser 🤡", allUser);
  }, [allUser]);

  useEffect(() => {
    (async () => {
      setEvents(await getAll());
    })();
  }, []);

  // Llama al hook directamente en el componente
  useErrorEventDetalle(resEvents, setResEvents, setEvents);

  useEffect(() => {
    console.log("los eventos", events);
  }, [events]);

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const experiencesEvent = experiences.filter((experience) =>
    experience.events && experience.events.includes(selectedEvent)
  );

  //! 5) estados de navegación
  if (ok) {
    return <Navigate to="/experiences" />;
  }

  return (
    <div>
      <div className="form-wrap">
        <div>
          <h1>Crear experiencia</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                placeholder="Vinos"
                {...register("name", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Nombre
              </label>
            </div>
            <div className="description_container form-group">
              <input
                className="input_user"
                type="texto"
                id="description"
                name="description"
                autoComplete="false"
                placeholder="Fuimos de vinos a Honolulu"
                {...register("description", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
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
