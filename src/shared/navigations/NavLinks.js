import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Button from "../ui/Button";
import { AppContexts } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const loginCotext = useContext(AppContexts);
  const history = useHistory();

  const logoutHandler = () => {
    loginCotext.LOGOUT_FUNC();
    history.push('/');
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          모든 사용자
        </NavLink>
      </li>
      <li>
        <NavLink to="/post/all">모든 글보기</NavLink>
      </li>
      {loginCotext.isLoggedIn && (
        <li>
          <NavLink to="/:userId/post">내가 쓴 글</NavLink>
        </li>
      )}
      {loginCotext.isLoggedIn && (
        <li>
          <NavLink to="/post/new">새 글 쓰기</NavLink>
        </li>
      )}

      {!loginCotext.isLoggedIn && (
        <li>
          <NavLink to="/auth">로그인</NavLink>
        </li>
      )}

      {loginCotext.isLoggedIn && (
        <li>
          <Button onClick={logoutHandler}>로그아웃</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
