import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./components/layout/landing"
import Navbar from "./components/layout/navbar"
import Register from "./components/auth/register"
import Login from "./components/auth/login"
import PrivateRoute from "./components/layout/privateRoute"
import { Provider } from "react-redux"
import store from "./store"
import { loadUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"
import { authActionTypes } from "./actions/types"
import Alert from "./components/layout/alert"
import Dashboard from "./components/dashboard/Dashboard"
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import ProfileForm from "./components/profile-forms/ProfileForm"
import NotFound from "./components/layout/NotFound"
import AddExperience from "./components/profile-forms/AddExperience"
import AddEducation from "./components/profile-forms/AddEducation"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"
import "./App.css"

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token)
    }

    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser())

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: authActionTypes.LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={store.getState().auth.isAuthenticated ? <Dashboard /> : <Landing />}></Route>
          <Route path="/login" element={store.getState().auth.isAuthenticated ? <Dashboard /> : <Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-profile" element={<PrivateRoute component={ProfileForm} />} />
          <Route path="/edit-profile" element={<PrivateRoute component={ProfileForm} />} />
          <Route path="/add-experience" element={<PrivateRoute component={AddExperience} />} />
          <Route path="/add-education" element={<PrivateRoute component={AddEducation} />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="posts" element={<PrivateRoute component={Posts} />} />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
