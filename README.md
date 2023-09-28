# react-blog.

---

#### 데모
### https://judeyong.github.io/react-blog-remake/

---

#### 설치와 실행 방법

## 설치 npm install

## 실행 npm start

---

### 서버가 없어 RestApi 형태를 사용할 수 없지만 데모를 github로 배포하기 위해 배열에 데이터를 넣어 사용했습니다.

---

#### 프로젝트 계획한 이유

자바스크립트를 어느 정도 공부하고 나서 react 공부를 시작하였습니다.  
react를 공부하면서 redux, typescript, nextjs, react-native등 또 새로운 기술을 접하였습니다.  
여러 가지 기술들을 보았지만 거의 대부분 클론 코딩이었습니다.  
클론 코딩은 저에게 도움이 되었지만 혼자서한 프로젝트는 하나도 없는 게 저의 고민이었습니다.  
그래서 서툴더라도 아는 것을 활용해서 스스로 만들어 보자 계획을 세웠습니다.  
아직도 많은 것이 미흡하고 서툽니다. 스스로 해보는 게 가장 중요하다 생각하고 만들면서 연습했습니다.  
기존에 만들었던 프로젝트를 반응형과 디자인의 변화, 기능을 추가하여 다시 만들었습니다.

---

### 설정

로그인 여부에 따라 표시 되는 라우터가 달라짐니다.  
로그인시 비밀번호를 입력하고 회원가입시 비밀번호를 가져야 하지만  
백서버가 없는 데모에서는 비밀번호가 가지는 보안의 기능은 없습니다.

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

ContextAPI를 활용하여 전체 컴포넌트에서 데이터를 사용할 수 있습니다.

    context 디렉토리
        auth-context.js 파일
        initial-datas.js 파일

    auth-context 파일의 내용.
    import { createContext } from "react";

    export const AppContexts = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    loginEmail: {},
    Email_FUNC: () => {},
    users: [],
    posts: [],
    ADD_USER: () => {},
    ADD_POSTS: () => {},
    UPDATE_POST: () => {},
    });

컴포넌트의 범용적으로 사용하기 위해


---

### 프로젝트 설명

루트 페이지에서 모든 사용자들을 목록으로 보여주며 사용자 프로필 카드를 클릭하면 해당 사용자가 작성한 글 목록나옵니다.   
모든 글 목록만 따로 볼 수 있습니다.   
글 목록의 글 카드를 클릭하면 모달 형태로 글이 나타납니다.   
로그인을 하지 않으면 사용자들의 글을 읽기만 가능합니다.   

로그인과 회원가입 기능이 존재합니다. 백서버가 없기때문에 인증과 보안에 대한 세부적인 설정은 할 수없지만   
간단한 validation을 만들어 프론트 사이드에서 활용하였습니다.

    customhooks
        validation.js

validation을 이용하여 입력 값을 isValid state를 설정합니다. 이 설정 값을 통해서   
버튼의 disabled 속성 값과 error 텍스트 state를 표시합니다.   
백서버에서 하는 확실한 인증은 아니지만 프론트에서 할 수 있는 간단한 인증입니다.   

로그인을 하면 글 작성이 가능해지고 자신이 작성한 글만 수정, 삭제가 가능합니다.   
글을 작성하면 posts 데이터에 추가됩니다.   
기본적인 CRUD 가능이 가능합니다.   
회원가입을 하면 users 데이터에 추가됩니다.   
initial-datas.js 에 CRUD 기능이 만들어져있습니다.   

반응형 및 모바일 환경에 맞게 UI가 수정됩니다.  
모달과 react-transition-group을 통해서 UI 애니메이션이 있습니다.

    media (min-width: 769px) {
    .main-nav__links {
        display: block;
        white-space: nowrap;
    }
    .main-nav__btn {
        display: none;
    }
    .main-navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        left: 12.5%;
        top: 0;
        width: 75%;
    }
    }

react-transition-group CSSTransiton 컴포넌트 사용.

    const content = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
            >
        <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )


---

### 사용한 라이브러리

    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^5.3.4",
    "react-scripts": "5.0.1",
    "react-transition-group": "^4.4.5",
    "web-vitals": "^2.1.4"

---

### 나아갈 방향

프로젝트를 진행하면서 최적화가 중요하다고 많이 느꼈습니다.  
리액트에서 제공되는 최적화 hook을 공부하고 있습니다.  
또 reduce hook을 공부하고 활용하여 코드를 좀 더 간결하게 만들것입니다.   
백서버를 만들어서 RestApi를 적용해 볼 예정입니다.   
부족한 점이 많지만 꾸준하게 채워나갈 것입니다.   
