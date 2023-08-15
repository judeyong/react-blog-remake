import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContexts } from "../../shared/context/auth-context";
import Card from "../../shared/ui/Card";
import Modal from "../../shared/ui/Modal";
import Button from "../../shared/ui/Button";
import UpdatePost from "./UpdatePost";
import "./AllPosts.css";

let selectedElements = {};

const AllPosts = (props) => {
  const allPosts = useContext(AppContexts);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [updateInputs, setUpdateInputs] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [updateInputsValid, setUpdateInputsValid] = useState(true);
  const history = useHistory();
  

  const openPostHandler = (element) => {
    setOpenModal(true);
    selectedElements = { ...element };
  };

  const closePostHandler = () => {
    setOpenModal(false);
  };

  const openEditModeHandler = () => {
    setOpenModal(false);
    setEditMode(true);
  };

  const closeEditModeHandler = () => {
    setEditMode(false);
    setOpenModal(true);
  };

  const openDeleteModeHandler = () => {
    setDeleteMode(true);
  };

  const closeDeleteModeHandler = () => {
    setDeleteMode(false);
  };

  const deletePostHandler =() => {
    allPosts.DELETE_POST(selectedElements);
    //console.log('allposts', allPosts.posts);
    allPosts.users.map((element) => {
      if(element.id === selectedElements.id){
        if(element.postCnt <= 0) {
          element.postCnt = 0
        }
        element.postCnt -=1;
      }
    });
    setDeleteMode(false);
    setEditMode(false);
    setOpenModal(false);
    history.push('/');
  };

  const completeUpdateHandler = (post) => {
    //console.log(post);
    allPosts.UPDATE_POST(post);
    setEditMode(false);
  };

  const postFormBtns = editMode ? (
    <div>
      <Button onClick={closeEditModeHandler}>취소</Button>
      <Button
        disabled={updateInputsValid}
        onClick={() => completeUpdateHandler(updateInputs)}
      >
        수정완료
      </Button>
    </div>
  ) : (
    <div className="postForm-btns__delete">
      <Button onClick={closePostHandler}>닫기</Button>
      {allPosts.isLoggedIn &&
        allPosts.loginEmail.id === selectedElements.id && (
          <div>
            <Button onClick={openEditModeHandler}>수정하기</Button>
            <Button onClick={openDeleteModeHandler}>삭제하기</Button>
          </div>
        )}
    </div>
  );

  const postElements =
    props.findMyPosts.length > 0 ? (
      <ul className="allposts-ul">
        {props.findMyPosts.map((element, idx) => {
          return (
            <Card key={idx} className="allposts-card">
              <li onClick={() => openPostHandler(element)}>
                <h2>제목 : {element.title}</h2>
                <h4>작성자 : {element.creator}</h4>
                <p>작성시간 : {element.date}</p>
                <p>클릭하여 글 내용을 확인해 보세요.</p>
              </li>
            </Card>
          );
        })}
      </ul>
    ) : (
      <ul className="allposts-ul">
        {allPosts.posts.map((element, idx) => {
          return (
            <Card key={idx} className="allposts-card">
              <li onClick={() => openPostHandler(element)}>
                <h2>제목 : {element.title}</h2>
                <h4>작성자 : {element.creator}</h4>
                <p>작성시간 : {element.date}</p>
                <p>클릭하여 글 내용을 확인해 보세요.</p>
              </li>
            </Card>
          );
        })}
      </ul>
    );

  //console.log("loginEmail", allPosts.loginEmail);
  //console.log("selectUser", selectedElements);

  return (
    <>
      <Modal
        show={openModal}
        onCancel={closePostHandler}
        header={selectedElements.title}
        date={selectedElements.date}
        footer={postFormBtns}
        contentClass="postcontent"
        footerClass={
          allPosts.isLoggedIn &&
          allPosts.loginEmail.id === selectedElements.id &&
          "postfooter"
        }
      >
        {selectedElements.description}
      </Modal>

      {/*update modal */}
      <Modal
        show={editMode}
        onCancel={closeEditModeHandler}
        date={selectedElements.date}
        footer={postFormBtns}
      >
        <UpdatePost
          updateInputs={updateInputs}
          setUpdateInputs={setUpdateInputs}
          selectedElements={selectedElements}
          updateInputsValid={updateInputsValid}
          setUpdateInputsValid={setUpdateInputsValid}
        />
      </Modal>

      {/*delete modal */}
      <Modal
        header="주의!"
        show={deleteMode}
        onCancel={closeDeleteModeHandler}
        footer={
          <div>
            <Button onClick={closeDeleteModeHandler}>취소하기</Button>
            <Button type='button' danger onClick={deletePostHandler} >삭제하기</Button>
          </div>
        }
        footerClass="deletefooter"
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>

      <div className="center">
        <h2>글 목록</h2>
        {postElements}
      </div>
    </>
  );
};

AllPosts.defaultProps = {
  findMyPosts: [],
};
export default AllPosts;
