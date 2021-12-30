import React from "react";
import "./Header.css";
import { Avatar, IconButton } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import { HelpOutline, LineStyleTwoTone } from "@material-ui/icons";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

// import Avatar from "./svg/head-side-mask.svg"
// import Clock from "./svg/clock.svg"
// import Search from "./svg/search.svg"

function Header({ m, setM, onSearchChange }) {
  const [user] = useAuthState(auth);
  return (
    <div className="header">
      <div className="header_left">
        <Avatar
          className="header_avatar"
          alt={user?.displayName}
          src={user?.photoURL}
          onClick={() => auth.signOut()}
        />

        <AccessTimeIcon />
      </div>
      <div className="header_search">
        <SearchIcon />

        <input type="text" placeholder="search" onChange={onSearchChange} />
      </div>
      <div className="header_right">
        <HelpOutline />
        <div className="header__hamburger">
          <IconButton onClick={() => setM(!m)}>
            <LineStyleTwoTone />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
