import React, { useState } from 'react';
import "./ExperiencesPage.css";

const ExperiencesPage = () => {
  // Supongamos que tienes un array de experiencias
  const [experiences, setExperiences] = useState([
    { id: 1, title: 'Cena internacional', description: 'Una cena donde cada invitado prepara un plato típico de su país.', image: 'https://via.placeholder.com/150', createdBy: 'Usuario1' },
    { id: 2, title: 'Tour por la ciudad', description: 'Recorrido por los lugares más emblemáticos de la ciudad.', image: 'https://via.placeholder.com/150', createdBy: 'Usuario2' },
    { id: 3, title: 'Clases de idiomas', description: 'Intercambio de idiomas entre personas de diferentes nacionalidades.', image: 'https://via.placeholder.com/150', createdBy: 'Usuario3' }
  ]);

  const [newExperience, setNewExperience] = useState({
    title: '',
    description: '',
    image: '',
    createdBy: 'Usuario Nuevo' // Supongamos que inicialmente el usuario es "Usuario Nuevo"
  });

  /* // Función para manejar el cambio en los campos del formulario */
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      /* // Si el campo es para la imagen, obtenemos la URL de la imagen subida */
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewExperience({
          ...newExperience,
          image: reader.result // Almacena la URL de la imagen como base64
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      /* // Si el campo no es para la imagen, actualizamos el estado normalmente */
      setNewExperience({
        ...newExperience,
        [e.target.name]: e.target.value
      });
    }
  };
/* // Función para manejar el envío del formulario */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExperience.title.trim() !== '' && newExperience.description.trim() !== '') {
      setExperiences([...experiences, { ...newExperience, id: experiences.length + 1 }]);
      setNewExperience({
        title: '',
        description: '',
        image: '',
        createdBy: 'Usuario Nuevo'
      });
    }
  };

  return (
    <div>
      <h2>Experiences</h2>
      <p>Discover and share experiences with others living abroad!</p>

      {/* Formulario para crear una nueva experiencia / */}
      <form id="formularios" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={newExperience.title} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={newExperience.description} onChange={handleChange} required />

        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/" onChange={handleChange} required />

        <button type="submit">Share Experience</button>
      </form>

       {/* Lista de experiencias */}
      <ul>
        {experiences.map(experience => (
          <li key={experience.id}>
            <h3>{experience.title}</h3>
            <img src={experience.image} alt={experience.title} style={{ maxWidth: '200px' }} />
            <p>{experience.description}</p>
            <p>Created by: {experience.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperiencesPage;
