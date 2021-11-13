import { useEffect, useState } from "react";

// Google Login
import { useGoogleLogin } from "react-google-login";
import { authKey } from "./config";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import RightNavbar from "./components/RightNavbar";
import IntroModal from "./components/IntroModal";
import PostMain from "./components/PostMain";
import DestroyLink from "./components/DestroyLink";

// Graphql
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/Query";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [user, setAuthID] = useState({ uid: "" });
  const [auth, setAuth] = useState("");
  const [modal, setModal] = useState(false);

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      uid: user.uid,
    },
  });

  if (!loading && user.uid.length > 0) {
    if (data) {
      auth !== user.uid && setAuth(user.uid);
    } else {
      !modal && setModal(true);
    }
  }

  const onSuccess = (res) => {
    const { googleId, givenName, familyName, name, email, imageUrl } =
      res.profileObj;

    setAuthID({
      uid: googleId,
      firstName: givenName,
      lastName: familyName,
      name,
      email,
      imageUrl,
    });
  };

  const { signIn, loaded } = useGoogleLogin({
    clientId: authKey,
    onSuccess: onSuccess,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
  });

  return (
    <>
      {!loaded ? (
        ""
      ) : auth.length > 0 ? (
        <div className="container grid grid-cols-[250px,632px,1fr]">
          <Router>
            <Navbar
              setAuth={setAuth}
              setModal={setModal}
              setAuthID={setAuthID}
              auth={auth}
            />

            <Routes>
              <Route path="/" element={<Home auth={auth} user={user} />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/post/:id" element={<PostMain auth={auth} />} />
              <Route path="*" element={<DestroyLink />} />
            </Routes>

            <RightNavbar />
          </Router>
        </div>
      ) : (
        <>
          {modal && (
            <IntroModal
              setAuth={setAuth}
              newUser={user}
              setAuthID={setAuthID}
              setModal={setModal}
            />
          )}
          <Login signIn={signIn} />
        </>
      )}
    </>
  );
};

export default App;
