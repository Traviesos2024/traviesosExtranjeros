import { UserChatMessage } from "../components";
export const UserChat = () => {
  const [chat, setChat] = useState({
    messages: [
      {
        id: 1,
        text: "message1",
        userId: "123",
      },
      {
        id: 2,
        text: "message2",
        userId: "456",
      },
      {
        id: 3,
        text: "message3",
        userId: "123",
      },
      {
        id: 4,
        text: "message4",
        userId: "456",
      },
    ],
  });

  //   useEffect(() => {
  //     (async () => {
  //       let data = await fetch(`https://rickandmortyapi.com/api/character/`).then(
  //         (res) => res.json()
  //       );
  //       // si la res es ok llamamos a la funcion puente del contexto y le pasamos el parámetro ALLUSER
  //       if (res?.status == 200) bridgeData("ALLUSER");
  //       setCharacterList(filterCharacterIfAlive(data.results));
  //     })();
  //   }, [res]);

  return (
    <>
      {chat?.messages.map((message) => (
        <UserChatMessage message={message} />
      ))}
    </>
  );
};
