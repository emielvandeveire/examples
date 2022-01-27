import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import UserPlaylists from "../views/playlists/users/UserPlaylists.vue";

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
    beforeEnter: requireAuth,
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/questionss/:qid",
    name: "QuestionDetails",
    component: QuestionDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/user",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth,
  },
  {
    path: "/questions",
    name: "Questions",
    component: Questions,
    beforeEnter: requireAuth,
  },
  {
    path: "/posts",
    name: "PostPlaylists",
    component: PostPlaylists,
    beforeEnter: requireAuth,
  },
  {
    path: "/questiontag/:tagTitle",
    name: "QuestionsWithFilter",
    component: QuestionsWithFilter,
    props: true,
    beforeEnter: requireAuth,
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
