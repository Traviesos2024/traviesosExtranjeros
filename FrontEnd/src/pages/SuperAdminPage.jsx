import { useNavigate } from 'react-router-dom';


export const SuperAdminPage = () => {

    const navigate = useNavigate();

return (
  <div className="superadmin-panel">
    <h1>SuperAdmin Panel</h1>
    <div className="button-container">
      <div>
        <button
            onClick={() =>
              navigate(`/createCountry`)
            }  
          >  Crear Pais
            </button>
      </div>
    </div>
  </div>
)};