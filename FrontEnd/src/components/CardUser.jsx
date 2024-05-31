import { useState } from "react";
import "./CardUser.css";
import { followUserToggle } from "../services/user.service";
export const CardUser = ({ data }) => {
  const { image, name, city } = data;
  const [isFollowing, setIsFollowing] = useState(data.isFollowing);

  const handleToggleFollow = async () => {
    try {
      const result = await followUserToggle(data._id);
      setIsFollowing(result.isFollowing);
    } catch (error) {
      console.error("Error siguiente al usuario", error);
    }
  };
  console.log("data", data);
  return (
    <div className="cardUser">
      <img src={data.image} alt={data.name} />
      <p> {name}</p>
      <p>{city.name}</p>
      <span onClick={handleToggleFollow} style={{ cursor: "pointer" }}>
        {" "}
        {isFollowing ? "Unfollow" : "Follow"}
      </span>
    </div>
  );
};
