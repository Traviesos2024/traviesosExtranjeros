import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: 0,
    city: "",
    country: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    // Función asincrónica para obtener los datos del usuario desde el backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/user-profile"); // Ruta para obtener los datos del perfil del usuario
        if (response.status === 200) {
          setUserData(response.data); // Establecer los datos del usuario en el estado
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Manejar el error adecuadamente
      }
    };

    fetchUserData(); // Llamar a la función para obtener los datos del usuario cuando el componente se monte
  }, []); // El segundo argumento del useEffect ([]) asegura que la función se ejecute solo una vez, equivalente a componentDidMount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/update-profile", userData);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={userData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={userData.city}
          onChange={handleChange}
        />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={userData.country}
          onChange={handleChange}
        />

        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <label htmlFor="image">Profile Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
