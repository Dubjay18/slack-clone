import React from "react";
import { useHistory } from "react-router-dom";
import "./SidebarOption.css";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function SidebarOption({ Icon, title, id, addChannelOption, less, setLess }) {
  const history = useHistory();
  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      //   db.collection("rooms").add({
      //     name: channelName,
      //   });
      addDoc(collection(db, "rooms"), {
        name: channelName,
      });
    }
  };
  const showOrLess = () => {
    setLess(!less);
  };
  return (
    <div
      className="sidebarOption"
      onClick={
        addChannelOption
          ? addChannel
          : less === true || less === false
          ? showOrLess
          : selectChannel
      }
    >
      {Icon && <Icon className="sidebarOption_icon" />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption_channel">
          <span className="sidebarOption_hash">#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
