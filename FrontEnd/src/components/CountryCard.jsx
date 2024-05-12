import "./CountryCard.css"; // Importa el archivo CSS con los estilos

const CountryCard = ({ city, image, description }) => {
  return (
    <div className="country-card">
      <img src={image} alt={city} />
      <h3>{country}</h3>
      <p>{description}</p>
    </div>
  );
};

//!--- FALTARIA AÑADIR TODOS LOS DATOS DE LA COUNTRY QUE INCLUIMOS EN EL MODELO DE COUNTRY (NEKY)

export default CountryCard;
