import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import db from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Sidebar({ m, setM }) {
  const [channels, setChannels] = useState([]);
  const [user] = useAuthState(auth);
  const [less, setLess] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rooms"));

    onSnapshot(q, (snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);
  // async function getCities(db) {
  //   const citiesCol = collection(db, "rooms");
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   console.log(cityList);
  //   return cityList;
  // }
  // getCities();
  return (
    <div className="sidebar" style={m ? { left: "0%" } : { left: "-100%" }}>
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h2>Jay's programmers</h2>
          <h3>
            <FiberManualRecord />
            {user?.displayName}
          </h3>
        </div>
        <Create />
      </div>
      <div className="sidebar__over">
        {less ? (
          ""
        ) : (
          <div className="sidebar__less">
            <SidebarOption Icon={InsertComment} title="Threads" />
            <SidebarOption Icon={Inbox} title="Mentions & reations" />
            <SidebarOption Icon={Drafts} title="Saved items" />
            <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
            <SidebarOption Icon={PeopleAlt} title="People & user groups" />
            <SidebarOption Icon={Apps} title="Apps" />
            <SidebarOption Icon={FileCopy} title="File browser" />
          </div>
        )}

        <SidebarOption
          Icon={less ? ExpandMore : ExpandLess}
          title={less ? "Show more" : "Show less"}
          onClick={() => setLess(!less)}
          less={less}
          setLess={setLess}
        />
        <hr />
        <SidebarOption Icon={ExpandMore} title="Channels" />
        <hr />
        <SidebarOption Icon={Add} title="addChannel" addChannelOption />

        {/* Connect to dB and list all the channels */}
        {/* <SidebarOption /> */}
        {channels.map((channel) => {
          return <SidebarOption title={channel.name} id={channel.id} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
