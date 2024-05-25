import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";

export const Followers = ({}) => {
  const { user } = useAuth();
  console.log("la caca", user);
  const [res, setRes] = useState({});

  return (
    <>
      <h3 className="TituloViajeros">En progeso</h3>
    </>
  );
};
