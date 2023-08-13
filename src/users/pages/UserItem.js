import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/ui/Card";
import Avatar from "../../shared/ui/Avartar";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/post`}>
          <div className="user-image">
            <Avatar image={props.image} alt={props.name} width='10rem' />
          </div>
          <div className="user-info">
            <h2>{props.name}</h2>
            <p>게시 글 : {props.postCnt} 개</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
