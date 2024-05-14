export const UserChatMessage = (message) => {
  return (
    <>
      <div key={message.id}>
        <h2>id: {message.text}</h2>
      </div>
    </>
  );
};
