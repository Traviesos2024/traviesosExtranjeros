import "./Input.css";

export const Input = ({ setValueInput, value }) => {
  return (
    <input
      id="busqueda"
      type="text"
      value={value}
      onChange={(e) => setValueInput(() => e.target.value)}
    />
  );
};
