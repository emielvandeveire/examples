import { createRouter, createWebHistory } from "vue-router";
import Search from "../views/Search.vue"
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import UserPlaylists from "../views/playlists/users/UserPlaylists.vue";

import Chat from "../views/Chat/Chat"

import ExampleVideo from "../views/playlists/Create/ExampleVideo.vue";
import PlaylistDetails from "../views/playlists/videos/PlaylistDetails.vue";
import CreatePlaylist from "../views/playlists/Create/CreatePlaylist.vue";

import ExamplePost from "../views/playlists/Create/ExamplePost.vue";
import PostDetails from "../views/playlists/posts/PostDetails.vue";
import PostPlaylists from "../views/playlists/posts/PostPlaylists.vue";

import CreateQuestion from "../views/playlists/Create/CreateQuestion.vue";
import QuestionDetails from "../views/playlists/questions/QuestionDetails.vue";
import Questions from "../views/playlists/questions/Questions.vue";
import QuestionsWithFilter from "../views/playlists/questions/QuestionsWithFilter.vue";

import UserDetails from "../views/playlists/users/UserDetails.vue";
import Users from "../views/playlists/users/Users.vue";

// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    props: true,
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
    props: true,
  },
  {
    path: "/questionss/:qid",
    name: "QuestionDetails",
    component: QuestionDetails,
    props: true,
  },
  {
    path: "/playlists/user",
    name: "UserPlaylists",
    component: UserPlaylists,
  },
  {
    path: "/questions",
    name: "Questions",
    component: Questions,
  },
  {
    path: "/posts",
    name: "PostPlaylists",
    component: PostPlaylists,
  },
  {
    path: "/questiontag/:tagTitle",
    name: "QuestionsWithFilter",
    component: QuestionsWithFilter,
    props: true,
  },
  {
    path: "/videos/create",
    name: "ExampleVideo",
    component: ExampleVideo,
    beforeEnter: requireAuth,
  },
  {
    path: "/posts/create",
    name: "ExamplePost",
    component: ExamplePost,
    beforeEnter: requireAuth,
  },
  {
    path: "/questions/create",
    name: "CreateQuestion",
    component: CreateQuestion,
    beforeEnter: requireAuth,
  },
  {
    path: "/users/:userId",
    name: "UserDetails",
    component: UserDetails,
    props: true,
  },
  {
    path: "/users/",
    name: "Users",
    component: Users,
  },
  {
    path: "/chat/:toUser",
    name: "Chat",
    component: Chat,
    props: true,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = document.title + " | " + to.name;
  next();
});

export default router;