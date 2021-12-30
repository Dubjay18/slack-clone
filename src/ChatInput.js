import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import "./ChatInput.css";
import { useAuthState } from "react-firebase-hooks/auth";
import db from "./firebase";
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "./firebase";
const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState("");

  const [user] = useAuthState(auth);

  const newq = collection(doc(db, "rooms", channelId), "messages");

  const sendMessage = (e) => {
    e.preventDefault();
    const regexp = /^S*$/;

    if (input === "") {
      alert("Type something!!");
    } else {
      if (channelId) {
        addDoc(newq, {
          message: input,
          timestamp: serverTimestamp(),
          user: user.displayName,
          userimage: user.photoURL,
        }).catch((error) => {
          console.log("error", error);
        });
        setInput("");
      }
    }
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          type={"text"}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
