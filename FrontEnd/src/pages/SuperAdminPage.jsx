import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";
import { useErrorUser } from "../hooks";
import { byId } from "../services/user.service";

export const SuperAdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resUser, setResUser] = useState([]);
  const [userById, setUserById] = useState(null);

  useEffect(() => {
    (async () => {
      setResUser(await byId(user._id));
    })(user);
  }, [user]);

  useEffect(() => {
    useErrorUser(resUser, setResUser, setUserById);
  }, [resUser]);

  useEffect(() => {
    console.log(userById);
  }, [userById]);

  return (
    <div className="superadmin-panel">
      <h1>SuperAdmin Panel</h1>
      <div className="button-container">
        <div>
          <button onClick={() => navigate(`/createCountry`)}>
            {" "}
            Añadir país
          </button>
        </div>
      </div>
    </div>
  );
};
