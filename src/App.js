import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AppContexts } from "./shared/context/auth-context";
import User from "./users/component/User";
import NewPost from "./posts/pages/NewPost";
import MainNavigation from "./shared/navigations/MainNavigation";
import Auth from "./auth/Auth";
import MyPosts from "./posts/pages/MyPosts";
import AllPosts from "./posts/pages/AllPosts";
import {
  initialUsers,
  initialAllPosts,
  addUser,
  updatePost,
  addPost,
  deletePost
} from "./shared/context/initial-datas";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    id: "",
    name: "",
  });

  const login = useCallback((element) => {
    setIsLoggedIn(true);
    setLoginInfo((prevState) => {
      return {
        ...prevState,
        email: element.email,
        id: element.id,
        name: element.name,
      };
    });
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoginInfo({
      email: "",
      id: "",
      name: "",
    });
  }, []);

  //console.log("login Id : ", loginInfo);
  //console.log("login state : ", isLoggedIn);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/post/all" exact component={AllPosts} />
        <Route path="/:userId/post" exact component={MyPosts} />
        <Route path="/post/new" exact component={NewPost} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/post/all" exact component={AllPosts} />
        <Route path="/:userId/post" exact component={MyPosts} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AppContexts.Provider
      value={{
        users: initialUsers,
        posts: initialAllPosts,
        ADD_USER: addUser,
        ADD_POSTS: addPost,
        UPDATE_POST: updatePost,
        DELETE_POST: deletePost,
        isLoggedIn: isLoggedIn,
        LOGIN_FUNC: login,
        LOGOUT_FUNC: logout,
        loginEmail: loginInfo,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AppContexts.Provider>
  );
}
export default App;
