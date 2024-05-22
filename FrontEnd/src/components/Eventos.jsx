import React, { useState, useEffect } from "react";
import { useErrorCountry } from "../hooks";
import { getByCity } from "../services/events.service";
import { useParams } from "react-router-dom";
export const Eventos = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getByCity(id));
    })();
  }, []);

  useEffect(() => {
    useErrorCountry(res, setRes, setEvents);
    console.log(res);
  }, [res]);

  return <></>;
};
