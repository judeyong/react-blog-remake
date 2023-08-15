import React, { useContext } from "react";

import { AppContexts } from "../../shared/context/auth-context";
import UserList from "../pages/UserList";

const User = () => {
  const auth = useContext(AppContexts);
  //console.log(auth.users);
  
  return (
    <div className="center">
      <UserList users={auth.users} />
    </div>
  );
};

export default User;
