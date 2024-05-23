export const Eventos = ({ name, src, date }) => {
  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>Evento: {name}</p>
      <p>Fecha: {new Date(date).toLocaleString()}</p>
    </figure>
  );
};
