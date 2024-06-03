import { Outlet, useNavigate } from "react-router-dom";

export const SuperAdminPage = () => {
  const navigate = useNavigate();
  return (
    <div className="superadmin-panel">
      <h1>SuperAdmin Panel</h1>
      <div className="button-container">
        <button onClick={() => navigate(`/superAdminPage/createCountry`)}>
          Crear nuevo país
        </button>

        <Outlet />
      </div>
    </div>
  );
};
