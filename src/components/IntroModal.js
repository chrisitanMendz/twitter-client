import { useState } from "react";

import { useGoogleLogout } from "react-google-login";
import { authKey } from "../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAt, faTimes } from "@fortawesome/free-solid-svg-icons";

import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_WITH_NICKNAME } from "../graphql/Query";
import { ADD_USER } from "../graphql/Mutation";

const IntroModal = ({ setAuth, setAuthID, newUser, setModal }) => {
  const [input, setInput] = useState("");

  const { signOut } = useGoogleLogout({
    clientId: authKey,
    onLogoutSuccess: () => {
      setAuthID({ uid: "" });
      setModal(false);
      setAuth("");
    },
  });

  const { data, loading } = useQuery(GET_USER_WITH_NICKNAME, {
    variables: {
      nickname: input,
    },
  });

  const [addUser] = useMutation(ADD_USER);

  const onSubmit = async () => {
    const { uid, firstName, lastName, name, email, imageUrl } = newUser;

    addUser({
      variables: {
        uid,
        firstName,
        lastName,
        name,
        email,
        imageUrl,
        nickname: input,
      },
    });
    setAuth(uid);
  };

  return (
    <div className="fixed w-screen h-screen bg-[#00000056] grid place-items-center">
      <div className="relative w-[600px] h-4/6 bg-white rounded-3xl py-4 px-8 flex flex-col items-center">
        <div className="mb-8">
          <FontAwesomeIcon icon={faTwitter} className="text-twit text-4xl" />
        </div>

        <h1 className="self-start text-[15px] mt-4 font-medium">
          Hi, {newUser.firstName}
        </h1>

        <h1 className="text-2xl font-semibold pb-5 self-start">
          What should we call you?
        </h1>

        <div
          className={`group relative w-full rounded-md border-[3px] border-gray-300 pt-1 flex items-center ${
            input ? "border-twit" : "focus-within:border-twit"
          }`}
        >
          <FontAwesomeIcon icon={faAt} className="absolute ml-3 text-twit" />
          <span
            className={`absolute duration-200 ${
              !input
                ? "ml-9 text-[15px] text-gray-500 pointer-events-none group-focus-within:text-twit group-focus-within:-translate-y-5 group-focus-within:text-xs group-focus-within:ml-3 group-focus-within:font-semibold"
                : "text-twit -translate-y-5 ml-3 text-xs font-semibold"
            } `}
          >
            Nickname
          </span>

          <input
            type="text"
            className="w-full py-4 pr-3 pl-8 outline-none text-[15px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {data?.userByNickname === "exist" && (
            <div className="absolute right-3 w-6 h-6 rounded-full bg-red-500 grid place-items-center">
              <div className="absolute hidden w-[fit-content] rounded-md whitespace-nowrap py-1 px-2 -right-2 bg-[#000000b4] text-white text-sm -translate-y-8 group-hover:block">
                {input
                  ? "This username already exist"
                  : "This field is required"}
              </div>
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}

          {!input && (
            <div className="absolute right-3 w-6 h-6 rounded-full bg-red-500 grid place-items-center">
              <div className="absolute hidden w-[fit-content] rounded-md whitespace-nowrap py-1 px-2 -right-2 bg-[#000000b4] text-white text-sm -translate-y-8 group-hover:block">
                {input
                  ? "This username already exist"
                  : "This field is required"}
              </div>
              <FontAwesomeIcon icon={faTimes} className="text-white text-sm" />
            </div>
          )}
        </div>
        <button
          className={`absolute bottom-6 right-8 text-white py-2 px-4 rounded-full ${
            data?.userByNickname === "none" && input ? "bg-sec" : "bg-blue-200"
          }`}
          onClick={() => !loading && onSubmit()}
        >
          Continue
        </button>

        <button
          className="absolute bottom-6 left-8 text-red-400 hover:underline"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default IntroModal;
