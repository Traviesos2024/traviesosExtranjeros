// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useErrorCity } from "../hooks";
// import { Loader } from "./Loader";
// import { eventById } from "../services/events.service";
// import { Comments } from "./index";
// import "./EventDetalle.css";

// export const EventDetalle = () => {
//   const [event, setEvent] = useState(null);
//   const [res, setRes] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setRes(await eventById(id));
//       console.log(event);
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorCity(res, setRes, setEvent);
//     console.log(res);
//   }, [res]);

//   const onToggleComments = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       {event != null ? (
//         <figure id="eventId">
//           <img src={event.image} />
//           <div className="title-and-icons-wrapper">
//             <h2>{event.name}</h2>
//             <div className="comment-icon-padding">
//               <span
//                 className="material-symbols-outlined"
//                 onClick={onToggleComments}
//               >
//                 mode_comment
//               </span>
//             </div>
//           </div>
//           <p>{event.description}</p>
//           <p>{new Date(event.date).toLocaleString()}</p>
//           <div className="card-comments-wrapper">
//             {open ? (
//               <>
//                 <Comments
//                   selectedRecipient={event._id}
//                   commentsProps={event?.comments}
//                 />
//                 <div className="close-chat-wrapper">
//                   <span
//                     onClick={onToggleComments}
//                     className="material-symbols-outlined"
//                   >
//                     close
//                   </span>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//           <button
//             onClick={() =>
//               navigate(`/${event.cities[0].name}/${event.cities[0]._id}`)
//             }
//           >
//             Ciudad del evento
//           </button>
//           <button onClick={() => navigate("/profile")}>Mi perfil</button>
//         </figure>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useErrorCity } from "../hooks";
// import { Loader } from "./Loader";
// import { eventById } from "../services/events.service";
// import { Comments } from "./index";
// import "./EventDetalle.css";

// export const EventDetalle = () => {
//   const [event, setEvent] = useState(null);
//   const [res, setRes] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setRes(await eventById(id));
//       console.log(event);
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorCity(res, setRes, setEvent);
//     console.log(res);
//   }, [res]);

//   const onToggleComments = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       {event != null ? (
//         <figure id="eventId">
//           <img src={event.image} />
//           <div className="title-and-icons-wrapper">
//             <h2>{event.name}</h2>
//             <div className="comment-icon-padding">
//               <span
//                 className="material-symbols-outlined"
//                 onClick={onToggleComments}
//               >
//                 mode_comment
//               </span>
//             </div>
//           </div>
//           <p>{event.description}</p>
//           <p>{new Date(event.date).toLocaleString()}</p>
//           <div className="card-comments-wrapper">
//             {open ? (
//               <>
//                 <Comments
//                   selectedRecipient={event._id}
//                   commentsProps={event?.comments}
//                 />
//                 <div className="close-chat-wrapper">
//                   <span
//                     onClick={onToggleComments}
//                     className="material-symbols-outlined"
//                   >
//                     close
//                   </span>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//           <button
//             onClick={() =>
//               navigate(`/${event.cities[0].name}/${event.cities[0]._id}`)
//             }
//           >
//             Ciudad del evento
//           </button>
//           <button onClick={() => navigate("/profile")}>Mi perfil</button>
//         </figure>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

//! ----- CÓDIGO NUEVO PARA METER EXPERIENCES EN EVENTOS ------

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useErrorCity } from "../hooks";
// import { Loader } from "./Loader";
// import { eventById, getExperiencesByEvent } from "../services/events.service";
// import { Comments } from "./index";
// import "./EventDetalle.css";

// export const EventDetalle = () => {
//   const [event, setEvent] = useState(null);
//   const [res, setRes] = useState({});
//   const [experiences, setExperiences] = useState([]);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const eventData = await eventById(id);
//       setRes(eventData);
//       const experiencesData = await getExperiencesByEvent(id);
//       setExperiences(experiencesData);
//       console.log(eventData);
//     })();
//   }, [id]);

//   useEffect(() => {
//     useErrorCity(res, setRes, setEvent);
//     console.log(res);
//   }, [res]);

//   const onToggleComments = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       {event != null ? (
//         <figure id="eventId">
//           <img src={event.image} alt={event.name} />
//           <div className="title-and-icons-wrapper">
//             <h2>{event.name}</h2>
//             <div className="comment-icon-padding">
//               <span
//                 className="material-symbols-outlined"
//                 onClick={onToggleComments}
//               >
//                 mode_comment
//               </span>
//             </div>
//           </div>
//           <p>{event.description}</p>
//           <p>{new Date(event.date).toLocaleString()}</p>
//           <div className="card-comments-wrapper">
//             {open ? (
//               <>
//                 <Comments
//                   selectedRecipient={event._id}
//                   commentsProps={event?.comments}
//                 />
//                 <div className="close-chat-wrapper">
//                   <span
//                     onClick={onToggleComments}
//                     className="material-symbols-outlined"
//                   >
//                     close
//                   </span>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//           <button
//             onClick={() =>
//               navigate(`/${event.cities[0].name}/${event.cities[0]._id}`)
//             }
//           >
//             Ciudad del evento
//           </button>
//           <button onClick={() => navigate("/profile")}>Mi perfil</button>
//           <div className="experiences">
//             <h3>Experiencias del evento {event.name}</h3>
//             {experiences.length > 0 ? (
//               experiences.map((experience) => (
//                 <div key={experience._id} className="experience">
//                   <h4>{experience.title}</h4>
//                   <p>{experience.description}</p>
//                   <p>{new Date(experience.date).toLocaleString()}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No hay experiencias para este evento.</p>
//             )}
//           </div>
//         </figure>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

//? -------- Eventos y experiencias creadas prueba -------------

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useErrorCity, useErrorEvent, useErrorEventDetalle } from "../hooks";
// import { Loader } from "./Loader";
// import { eventById } from "../services/events.service";
// import { Comments, Experience } from "./index";
// import "./EventDetalle.css";

// export const EventDetalle = () => {
//   const [eventoById, setEventById] = useState(null);
//   const [resEvent, setResEvent] = useState({});

//   // const [res, setRes] = useState({});
//   // const [experiences, setExperiences] = useState([]);
//   const { id, idExperience } = useParams();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   // const fetchExperiences = async () => {
//   //   const experiencesData = await byId(idExperience);
//   //   setExperiences(experiencesData);
//   //   console.log("experiencesData", experiencesData);
//   // };
//   useEffect(() => {
//     (async () => {
//       setResEvent(await eventById(id));
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorEventDetalle(resEvent, setResEvent, setEventById);
//   }, [resEvent]);

//   useEffect(() => {
//     console.log("eventoById lo trae", eventoById);
//   }, [eventoById]);

//   // useEffect(() => {
//   //   (async () => {
//   //     const eventData = await eventById(id);
//   //     setRes(eventData);
//   //     await fetchExperiences();
//   //     console.log(eventData);
//   //   })();
//   // }, [id]);

//   // useEffect(() => {
//   //   useErrorCity(res, setRes, setEvent);
//   //   console.log(res);
//   // }, [res]);

//   const onToggleComments = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       {eventoById != null ? (
//         <figure id="eventId">
//           <img src={eventoById.image} alt={eventoById.name} />
//           <div className="title-and-icons-wrapper">
//             <h2>{eventoById.name}</h2>
//             <div className="comment-icon-padding">
//               <span
//                 className="material-symbols-outlined"
//                 onClick={onToggleComments}
//               >
//                 mode_comment
//               </span>
//             </div>
//           </div>
//           <p>{eventoById.description}</p>
//           <p>{new Date(eventoById.date).toLocaleString()}</p>
//           <div className="card-comments-wrapper">
//             {open ? (
//               <>
//                 <Comments
//                   selectedRecipient={eventoById._id}
//                   commentsProps={eventoById?.comments}
//                 />
//                 <div className="close-chat-wrapper">
//                   <span
//                     onClick={onToggleComments}
//                     className="material-symbols-outlined"
//                   >
//                     close
//                   </span>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//           <button
//             onClick={() =>
//               navigate(`/${eventoById.cities[0].name}/${eventoById.cities[0]._id}`)
//             }
//           >
//             Ciudad del evento
//           </button>
//           <button onClick={() => navigate("/profile")}>Mi perfil</button>
//           <button onClick={() => navigate(`/ExperiencesForm`)}>
//             Crear Experiencia
//           </button>
//           <div className="experiences">
//             <h3>Experiencias</h3>
  
//             {/* {experiences.length > 0 ? (
//               experiences.map((experience) => (
//                 <div key={experience._id} className="experience">
//                   <h4>{experience.name}</h4>
//                   <p>{experience.description}</p>
//                   <p>{new Date(experience.date).toLocaleString()}</p>
//                 </div>
                
//               ))
//             ) : (
//               <p>No hay experiencias para este evento.</p>
//             )} */}
//           </div>
//           <div>
//             {eventoById != null ? (
//               eventoById.experience.map((item) => (
//                 <Experience
//                   renderData={item}
//                   key={item._id}
//                   setEvents={setEventById}
//                   profile={true}
//                   handleDeleteExperience={handleDeleteExperience}
//                   handleUpdate={handleUpdate}
//                   userAuth={eventoById}
//                 />
//               ))
//             ) : (
//               <p>No hay experiencias creadas disponibles</p>
//             )}
//           </div>
//         </figure>
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useErrorEventDetalle } from "../hooks";
import { Loader } from "./Loader";
import { eventById } from "../services/events.service";
import { Comments, Experience } from "./index";
import "./EventDetalle.css";

export const EventDetalle = () => {
  const [eventoById, setEventById] = useState(null);
  const [resEvent, setResEvent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventById(id);
      setResEvent(response);
    };
    fetchEvent();
  }, [id]);

  // Llama al hook directamente en el componente
  useErrorEventDetalle(resEvent, setResEvent, setEventById);

  const onToggleComments = () => {
    setOpen(!open);
  };

  return (
    <div>
      {eventoById != null ? (
        <figure id="eventId">
          <img src={eventoById.image} alt={eventoById.name} />
          <div className="title-and-icons-wrapper">
            <h2>{eventoById.name}</h2>
            <div className="comment-icon-padding">
              <span
                className="material-symbols-outlined"
                onClick={onToggleComments}
              >
                mode_comment
              </span>
            </div>
          </div>
          <p>{eventoById.description}</p>
          <p>{new Date(eventoById.date).toLocaleString()}</p>
          <div className="card-comments-wrapper">
            {open ? (
              <>
                <Comments
                  selectedRecipient={eventoById._id}
                  commentsProps={eventoById?.comments}
                />
                <div className="close-chat-wrapper">
                  <span
                    onClick={onToggleComments}
                    className="material-symbols-outlined"
                  >
                    close
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() =>
              navigate(`/${eventoById.cities[0].name}/${eventoById.cities[0]._id}`)
            }
          >
            Ciudad del evento
          </button>
          <button onClick={() => navigate("/profile")}>Mi perfil</button>
          <button onClick={() => navigate(`/ExperiencesForm`)}>
            Crear Experiencia
          </button>
          <div className="experiences">
            <h3>Experiencias</h3>
            {/* {experiences.length > 0 ? (
              experiences.map((experience) => (
                <div key={experience._id} className="experience">
                  <h4>{experience.name}</h4>
                  <p>{experience.description}</p>
                  <p>{new Date(experience.date).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No hay experiencias para este evento.</p>
            )} */}
          </div>
          <div>
            {eventoById != null ? (
              eventoById.experience.map((item) => (
                <Experience
                  renderData={item}
                  key={item._id}
                  setEvents={setEventById}
                  profile={true}
                  handleDeleteExperience={handleDeleteExperience}
                  handleUpdate={handleUpdate}
                  userAuth={eventoById}
                />
              ))
            ) : (
              <p>No hay experiencias creadas disponibles</p>
            )}
          </div>
        </figure>
      ) : (
        <Loader />
      )}
    </div>
  );
};



