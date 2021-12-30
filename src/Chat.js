import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import {
  collection,
  orderBy,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = ({ m, setM, search }) => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  useEffect(() => {
    if (roomId) {
      const q = doc(db, "rooms", roomId);

      onSnapshot(q, (snapshot) => setRoomDetails(snapshot.data()));
    }
    const q = doc(db, "rooms", roomId);
    const newq = query(collection(q, "messages"), orderBy("timestamp"));
    onSnapshot(newq, (snapshot) => {
      setRoomMessages(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, [roomId]);
  const fliteredMessages = roomMessages.filter((roomMessage) => {
    return roomMessage.message.toLowerCase().includes(search.toLowerCase());
  });
  console.log(fliteredMessages);
  return (
    <div className="chat" onClick={() => setM(false)}>
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong>#{roomDetails?.name}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {fliteredMessages.map(({ message, timestamp, user, userimage }) => {
          return (
            <Message
              message={message}
              timestamp={timestamp}
              user={user}
              userimage={userimage}
            />
          );
        })}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
