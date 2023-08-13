import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContexts } from "../../shared/context/auth-context";
import AllPosts from "./AllPosts";

const MyPosts = () => {
  const posts = useContext(AppContexts);
  let { userId } = useParams();
  
  //console.log('posts.loginEmail ', posts.loginEmail);

  if(userId === ':userId') {
    userId = posts.loginEmail.id;
  }
  //console.log('userId ', userId);
  const findMyPosts = posts.posts.filter((items) => {
    //console.log(items);
    return items.id === userId;
  });

  //console.log(findMyPosts);

  if (findMyPosts.length === 0) {
    return (
      <div className="center">
        <h2>생성한 글이 존재하지 않습니다...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="center">{findMyPosts[0].id === posts.loginEmail.id? '나의 글' : `${findMyPosts[0].creator} 님의 글`} </h2>
      <AllPosts findMyPosts={findMyPosts} />
    </div>
  );
};

export default MyPosts;
