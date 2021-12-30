import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import slackLogo from "./svg/undraw.png";
import Spinner from "react-spinkit";
function App() {
  const [user, loading] = useAuthState(auth);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    <div className="app__loading">
      <div className="app__loadingContents">
        <img src={slackLogo} alt="" />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </div>
    </div>;
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header
              m={mobileSidebar}
              setM={setMobileSidebar}
              onSearchChange={onSearchChange}
            />
            <div className="app__body">
              <Sidebar m={mobileSidebar} setM={setMobileSidebar} />
              <Switch>
                <Route path={"/room/:roomId"}>
                  <Chat
                    m={mobileSidebar}
                    setM={setMobileSidebar}
                    search={search}
                  />
                </Route>
                <Route path={"/"}>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <h1>Welcome</h1>
                    <p>Select a channel in the sidebar to send messages</p>
                    <p>Click your profile pic to log out</p>
                  </div>
                </Route>
              </Switch>
              {/* React-Router -> Chat Screen  */}
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
