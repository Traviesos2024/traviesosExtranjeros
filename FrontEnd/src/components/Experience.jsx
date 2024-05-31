

// import "./Experience.css";
// import { Comments } from "./index";
// import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
// import { useState, useRef} from "react";
// import { toggleLikeExperience } from "../services/experiences.service"; // Importar la función de servicio

// export const Experience = ({
//   // name,
//   // src,
//   // description,
//   // initialLikes,
//   // comments,
//   // events,
//   // experienceId,
//   // userId,
//   setExperiences,
//   profile,
//   // item,
//   handleDeleteExperience,
//   renderData,
//   userAuth,
// }) => {
//   const {
//     _id,
//     image,
//     name,
//     likes,
//     events,
//     description,
    
//   } = renderData;
//   console.log("render data", renderData);


//   const [open, setOpen] = useState(false);
//   const spanFollowRef = useRef(null);
//   const { user } = useAuth();
//   const onToggleLike = async () => {
//     try {
//       const res = await toggleLikeExperience(_id);
//       if (res.status === 200) {
//         console.log("respuesta data", res.data);
//         //! siguiente linea no SE TOCA!!!
//         if (profile) {
//           setExperiences(res.data.events);
//         } else {
//           const filteredExperiences = res.data.allExperience.filter((experience) =>
//             experience.events.some((events) => events?.name === userAuth.experience.name)
//           );
//           console.log("los eventos que trae", events);

//           console.log("experiencias filtradas", filteredExperiences);
//           setExperiences(filteredExperiences);
//         }
//         console.log("Toggle Like Response:", res.data);
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);

//     }
//   };
  
//   // Obtener el estado del like del backend cuando el componente se monte
  

//   const onToggle = (event) => {
//     event.preventDefault();
//     setOpen(!open);
//   };

//   // const onToggleLike = async (experiences) => {
//   //   try {
//   //     const res = await toggleLikeExperience(experienceId);
//   //     console.log("res", res)
//   //     res.status == 200 && 
//   //     setExperiences(res.data.allExperience)
//   //   } catch (error) {
//   //     console.error("Error toggling like:", error);
//   //   };
//   // };
  
//   return (
//     <figure key={_id}>
//       <img src={image} alt={name} width={350} height={200} />
//       {/* <p>{name}</p>
//       <p>{description}</p>
//       <p>{likes}</p> */}
//       <div onClick={onToggleLike} className="favorite-icon">
//         <span className={likes.includes(user._id)? 'material-symbols-outlined favorite' : 'material-symbols-outlined'}>
//           favorite
//         </span>
//         <span>{likes.length}</span>
//       </div>
//       {handleDeleteExperience && ( 
//             <button onClick={() => handleDeleteExperience(experienceId)}>
//               <span class="material-symbols-outlined">
//                 delete
//               </span>
//             </button>
//           )}
//       <h3>{name}</h3>
//         <p>Descripción: {description}</p>
//         {/* <p>Evento: {events.name}</p> */}
        
//       <div>
//         <h4 onClick={onToggle}>Comments</h4>
//         {open ? (
//           <Comments selectedRecipient={experienceId} commentsProps={comments} />
//         ) : (
//           ""
//         )}
//       </div>
//     </figure>
//   );
// };

import "./Experience.css";
import { Comments } from "./index";
import { useAuth } from "../context/authContext";
import { useState, useRef } from "react";
import { toggleLikeExperience } from "../services/experiences.service";

export const Experience = ({
  setExperiences,
  profile,
  handleDeleteExperience,
  renderData,
  userAuth,
}) => {
  const { _id, image, name, likes, events, description } = renderData;
  console.log("render data", renderData);

  const [open, setOpen] = useState(false);
  const spanFollowRef = useRef(null);
  const { user } = useAuth();

  const onToggleLike = async () => {
    try {
      const res = await toggleLikeExperience(_id);
      if (res.status === 200) {
        console.log("respuesta data", res.data);
        //! siguiente linea no SE TOCA!!!
        if (profile) {
          setExperiences(res.data.user);
        } else {
          const filteredExperiences = res.data.allExperience.filter((experience) => {
            // Verificar que events es un array antes de usar some
            return Array.isArray(experience.events) &&
              experience.events.some((event) => event.name === userAuth.experience.name);
          });
          console.log("los eventos que trae", events);

          console.log("experiencias filtradas", filteredExperiences);
          setExperiences(filteredExperiences);
        }
        console.log("Toggle Like Response:", res.data);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onToggle = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <figure key={_id}>
      <img src={image} alt={name} width={350} height={200} />
      {/* <p>{name}</p>
      <p>{description}</p>
      <p>{likes}</p> */}
      <div onClick={onToggleLike} className="favorite-icon">
        <span className={likes.includes(user._id) ? 'material-symbols-outlined favorite' : 'material-symbols-outlined'}>
          favorite
        </span>
        <span>{likes.length}</span>
      </div>
      {handleDeleteExperience && (
        <button onClick={() => handleDeleteExperience(_id)}>
          <span className="material-symbols-outlined">
            delete
          </span>
        </button>
      )}
      <h3>{name}</h3>
      <p>Descripción: {description}</p>
      {/* <p>Evento: {events.name}</p> */}

      <div>
        <h4 onClick={onToggle}>Comments</h4>
        {open ? (
          <Comments selectedRecipient={_id} commentsProps={renderData.comments} />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
};



// import "./Experience.css";
// import { Comments } from "./index";
// import { useState, useEffect } from "react";
// import axios from 'axios'; // Asegúrate de tener axios instalado y importado
// import { fetchFavoriteStatus } from "../services/experiences.service";
// export const Experience = ({
//   name,
//   src,
//   description,
//   likes,
//   comments,
//   events,
//   experienceId,
//   userId, // Asegúrate de pasar el userId como prop
// }) => {
//   const [open, setOpen] = useState(false);
//   const [favorite, setFavorite] = useState(false); // Estado de like

//   // Obtener el estado del like del backend cuando el componente se monte
//   useEffect(() => {
//     const fetchFavoriteStatus = async () => {
//       try {
//         const response = await axios.get(`/api/experiences/${experienceId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}` // Asumiendo que usas token para autenticación
//           }
//         });
//         if (response.status === 200) {
//           const isLiked = response.data.likes.includes(userId); // Asumiendo que response.data.likes es un array de user IDs
//           setFavorite(isLiked);
//         }
//       } catch (error) {
//         console.error("Error fetching favorite status:", error);
//       }
//     };
//     fetchFavoriteStatus();
//   }, [experienceId, userId]);

//   const onToggle = (event) => {
//     event.preventDefault();
//     setOpen(!open);
//   };

//   const onToggleFavorite = async () => {
//     try {
//       const response = await axios.patch(`/api/experiences/like/${experienceId}`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}` // Asumiendo que usas token para autenticación
//         }
//       });
//       if (response.status === 200) {
//         setFavorite(prevFavorite => !prevFavorite);
//       }
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//     }
//   };

//   return (
//     <figure>
//       <img src={src} alt={name} width={350} height={200} />
//       <p>{name}</p>
//       <p>{description}</p>
//       <p>{likes}</p>
//       <div onClick={onToggleFavorite} className="favorite-icon">
//         <span className={`material-symbols-outlined ${favorite ? 'favorite' : 'not-favorite'}`}>
//           favorite
//         </span>
//       </div>
//       <p>{events}</p>
//       <div>
//         <h4 onClick={onToggle}>Comments</h4>
//         {open ? (
//           <Comments selectedRecipient={experienceId} commentsProps={comments} />
//         ) : (
//           ""
//         )}
//       </div>
//     </figure>
//   );
// };

// import "./Experience.css";
// import { Comments } from "./index";
// import { useState, useEffect } from "react";
// import {fetchExperiences}
// export const Experience = ({
//   name,
//   src,
//   description,
//   likes,
//   comments,
//   events,
//   experienceId,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [favorite, setFavorite] = useState(false); // like y dislike

//   // Recuperar el estado del local storage cuando el componente se monte
//   useEffect(() => {
//     const savedFavorite = localStorage.getItem(`favorite-${experienceId}`);
//     if (savedFavorite) {
//       setFavorite(JSON.parse(savedFavorite));
//     }
//   }, [experienceId]);

//   useEffect(() => {
//     const likes = async () => {
//       const experiencesData = await fetchExperiences();
//       setExperiences(experiencesData);
//     };
//     likes();
//   }, []);

//   const onToggle = (event) => {
//     event.preventDefault();
//     setOpen(!open);
//   };

//   const onToggleFavorite = () => {
//     const newFavoriteState = !favorite;
//     setFavorite(newFavoriteState);
//     localStorage.setItem(`favorite-${experienceId}`, JSON.stringify(newFavoriteState));
//   };
  
//   return (
//     <figure>
//       <img src={src} alt={name} width={350} height={200} />
//       <p>{name}</p>
//       <p>{description}</p>
//       <p>{likes}</p>
//       <div onClick={onToggleFavorite} className="favorite-icon">
//         <span className={`material-symbols-outlined ${favorite ? 'favorite' : 'not-favorite'}`}>
//           favorite
//         </span>
//         </div>
//       <p>{events}</p>
//       <div>
//         <h4 onClick={onToggle}>Comments</h4>
//         {open ? (
//           <Comments selectedRecipient={experienceId} commentsProps={comments} />
//         ) : (
//           ""
//         )}
//       </div>
//     </figure>
//   );
// };
