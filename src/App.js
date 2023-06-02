import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import HomeScreen from "./screens/HomeScreen";
import LikedVideos from "./screens/likedVideos/LikedVideos";
import Login from "./screens/login/Login";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionScreen from "./screens/subscription/SubscriptionScreen";
import WatchScreen from "./screens/watch/WatchScreen";

import "./screens/_app.scss";

const Layout = ({ children }) => {
  const [sideBar, toogleSideBar] = useState(false);

  const handleSideBar = () => {
    toogleSideBar(!sideBar);
  };

  return (
    <>
      <Header handleSideBar={handleSideBar} />
      <div className="app_container">
        <SideBar sideBar={sideBar} handleSideBar={handleSideBar} />

        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/login");
    }
  }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/search/:query" exact>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>

      <Route path="/watch/:id" exact>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route path="/feed/subscriptions" exact>
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>

      <Route path="/channel/:channelId" exact>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>

      <Route path="/feed/liked-videos" exact>
        <Layout>
          <LikedVideos />
        </Layout>
      </Route>

      {/*404 page */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
