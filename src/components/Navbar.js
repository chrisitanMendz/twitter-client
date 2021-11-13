import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import homeSolid from "../assets/homeSolid.png";
import homeLine from "../assets/homeLine.png";
import exploreSolid from "../assets/exploreSolid.png";
import exploreLine from "../assets/exploreLine.png";
import notifSolid from "../assets/notifSolid.png";
import notifLine from "../assets/notifLine.png";
import messageSolid from "../assets/messageSolid.png";
import messageLine from "../assets/messageLine.png";
import bookSolid from "../assets/bookSolid.png";
import bookLine from "../assets/bookLine.png";
import listSolid from "../assets/listSolid.png";
import listLine from "../assets/listLine.png";
import profileSolid from "../assets/profileSolid.png";
import profileLine from "../assets/profileLine.png";
import dots from "../assets/dots.png";

import lists from "../data/navbar.json";

import { Link, useNavigate } from "react-router-dom";

// Google auth
import { useGoogleLogout } from "react-google-login";
import { authKey } from "../config";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/Query";

const Navbar = ({ setAuth, setAuthID, setModal, auth }) => {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("Home");
  const { data } = useQuery(GET_USER, {
    variables: {
      uid: auth,
    },
  });

  const { signOut, loaded } = useGoogleLogout({
    clientId: authKey,
    onLogoutSuccess: () => {
      if (loaded) {
        setAuthID({ uid: "" });
        setModal(false);
        setAuth("");
        navigate("/");
      }
    },
  });

  let name;
  let nickname;

  if (data) {
    if (data.userById.name.length > 15) {
      name = data.userById.name.substring(0, 14);
      name = name + "...";
    } else {
      name = data.userById.name;
    }
    if (data.userById.nickname.length > 13) {
      nickname = data.userById.nickname.substring(0, 12);
      nickname = nickname + "...";
    } else {
      nickname = data.userById.nickname;
    }
  }

  return (
    <div className="min-h-screen sticky top-0 self-start">
      <div className="block py-[16px] px-[13px]">
        <div className="w-[26.25px] h-[26.25px] grid place-items-center">
          <FontAwesomeIcon icon={faTwitter} className="text-3xl text-twit" />
        </div>
      </div>

      <Link
        to="/"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Home")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Home" ? homeSolid : homeLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Home" && "font-semibold"}`}>
            Home
          </p>
        </div>
      </Link>

      <Link
        to="/explore"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Explore")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Explore" ? exploreSolid : exploreLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Explore" && "font-semibold"}`}>
            Explore
          </p>
        </div>
      </Link>

      <Link
        to="/notifications"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Notifications")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Notifications" ? notifSolid : notifLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p
            className={`ml-5 ${
              activeNav === "Notifications" && "font-semibold"
            }`}
          >
            Notification
          </p>
        </div>
      </Link>

      <Link
        to="/messages"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Messages")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Messages" ? messageSolid : messageLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Messages" && "font-semibold"}`}>
            Messages
          </p>
        </div>
      </Link>

      <Link
        to="/bookmarks"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Bookmarks")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Bookmarks" ? bookSolid : bookLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Bookmarks" && "font-semibold"}`}>
            Bookmarks
          </p>
        </div>
      </Link>

      <Link
        to="/lists"
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Lists")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Lists" ? listSolid : listLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Lists" && "font-semibold"}`}>
            Lists
          </p>
        </div>
      </Link>

      <Link
        to={`/profile/${auth}`}
        className="group block py-1 cursor-pointer"
        onClick={() => setActiveNav("Profile")}
      >
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img
              src={activeNav === "Profile" ? profileSolid : profileLine}
              className="w-[26.25px] h-[26.25px]"
              alt=""
            />
          </div>
          <p className={`ml-5 ${activeNav === "Profile" && "font-semibold"}`}>
            Profile
          </p>
        </div>
      </Link>

      <Link to="/more" className="group block py-1 cursor-pointer">
        <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
          <div className="w-[26.25px] h-[26.25px] grid place-items-center">
            <img src={dots} className="w-[26.25px] h-[26.25px]" alt="" />
          </div>
          <p className={`ml-5`}>More</p>
        </div>
      </Link>

      <button className="block w-[fit-content] py-3 px-20 mt-2 bg-sec text-white text-[17px] font-semibold rounded-full cursor-pointer hover:bg-hov">
        Tweet
      </button>

      {data && (
        <div
          className="group flex items-center absolute bottom-3 w-full rounded-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={signOut}
        >
          <p className="absolute hidden px-4 py-1 rounded-md bg-[#000000b0] text-white text-sm left-0 top-[-30px] group-hover:block">
            Sign out
          </p>

          <div
            className="w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${data.userById.imageUrl}')` }}
          ></div>

          <div className="pl-2">
            <h1 className="text-[15px] font-semibold">{name}</h1>
            <p className="text-[15px] text-sec leading-3">@{nickname}</p>
          </div>

          <div className="group flex-1 flex justify-end">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-xl text-sec" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

{
  /* {lists.map((list) => (
        <Link
          to={`/${list.path}`}
          key={list.name}
          className="group block py-1 cursor-pointer"
          onClick={() => list.name !== "More" && setActiveNav(list.name)}
        >
          <div className="flex items-center p-3 text-xl w-[fit-content] bg-white rounded-full group-hover:brightness-90 duration-200">
            <div className="w-[26.25px] h-[26.25px] grid place-items-center">
              <img
                src={
                  list.name === "Home" && activeNav === "Home"
                    ? homeSolid
                    : list.name === "Explore" && activeNav === "Explore"
                    ? exploreSolid
                    : list.name === "Notifications" &&
                      activeNav === "Notifications"
                    ? notifSolid
                    : list.name === "Messages" && activeNav === "Messages"
                    ? messageSolid
                    : list.name === "Bookmarks" && activeNav === "Bookmarks"
                    ? bookSolid
                    : list.name === "Lists" && activeNav === "Lists"
                    ? listSolid
                    : list.name === "Profile" && activeNav === "Profile"
                    ? profileSolid
                    : list.name === "Home"
                    ? homeLine
                    : list.name === "Explore"
                    ? exploreLine
                    : list.name === "Notifications"
                    ? notifLine
                    : list.name === "Messages"
                    ? messageLine
                    : list.name === "Bookmarks"
                    ? bookLine
                    : list.name === "Lists"
                    ? listLine
                    : list.name === "Profile"
                    ? profileLine
                    : list.name === "More"
                    ? dots
                    : ""
                }
                className="w-[26.25px] h-[26.25px]"
                alt=""
              />
            </div>
            <p className={`ml-5 ${activeNav === list.name && "font-semibold"}`}>
              {list.name}
            </p>
          </div>
        </Link>
      ))} */
}
