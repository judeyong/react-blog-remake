export const initialUsers = [
  {
    id: "user1",
    email: "user1@test.com",
    name: "user1",
    image:
      "https://cdn.pixabay.com/photo/2023/06/02/10/06/nature-8035211_1280.jpg",
    postCnt: 1,
  },
  {
    id: "user2",
    email: "user2@test.com",
    name: "user2",
    image:
      "https://media.istockphoto.com/id/864568096/ko/%EC%82%AC%EC%A7%84/%EB%8B%AC%EB%9D%BC%EC%8A%A4-%EB%82%98%EB%88%84%EA%B8%B0%EC%97%90-%EC%BD%9C%EB%A1%9C%EB%9D%BC%EB%8F%84-%EB%A1%9D-%ED%82%A4-%EC%82%B0%EB%A7%A5%EC%9D%98-%EA%B2%BD%EC%B9%98.jpg?s=2048x2048&w=is&k=20&c=-HHJOKpe3DJh8jEHHPI62QbeOs1Slm93x8ucd_8qGqs=",
    postCnt: 1,
  },
];

export let initialAllPosts = [
  {
    email: "user1@test.com",
    title: "테스트",
    description: "테스트 글입니다.",
    date: new Date().toLocaleString(),
    creator: "user1",
    id: "user1",
  },
  {
    email: "user2@test.com",
    title: "테스트2",
    description: "테스트2 글입니다.",
    date: new Date().toLocaleString(),
    creator: "user2",
    id: "user2",
  },
];

export const addUser = (userInfo) => {
  //console.log("addUser : ", userInfo);
  initialUsers.push(userInfo);
};

export const addPost = (post) => {
  initialAllPosts.push({
    email : post.email,
    title: post.title,
    description: post.description,
    date: post.date,
    creator: post.creator,
    id: post.id,
  });
};

export const updatePost = (post) => {
  initialAllPosts.map((item) => {
    if (item.creator === post.id) {
      item.title = post.title;
      item.description = post.description;
    }
    return null;
  });
};

export const deletePost = (post) => {
  //console.log('post', post);
  const newPosts = initialAllPosts.filter((element) => {
    if(element.id !== post.id) {
      return element;
    } else if(element.id === post.id) {
      return element.date !== post.date;
    } else {
      return null;
    }
    
  });
  //console.log(newPosts);
  initialAllPosts.splice(0, initialAllPosts.length);

  newPosts.map((elements) => {
    return initialAllPosts.push(elements);
  });
};