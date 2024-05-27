import React, { useState, useEffect } from "react";
import { useErrorUser } from "../hooks";
import { getAll } from "../services/user.service";
import { CardUser } from "../components/CardUser";

export const UserAll = () => {
  const [users, setUsers] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAll();
      setRes(result);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (res) {
      useErrorUser(res, setRes, setUsers);
    }
  }, [res]);

  return (
    <div id="containerCountryAll">
      {users.length !== 0 ? (
        users.map((item) => <CardUser data={item} key={item._id} />)
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
