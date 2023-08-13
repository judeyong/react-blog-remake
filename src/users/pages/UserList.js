import React from "react";

import UserItem from "./UserItem";

const UserList = (props) => {
  return (
    <div>
      {props.users.map((element) => {
        return (
          <UserItem
            key={element.id}
            id={element.id}
            name={element.name}
            image={element.image}
            postCnt={element.postCnt}
          />
        );
      })}
    </div>
  );
};

export default UserList;
