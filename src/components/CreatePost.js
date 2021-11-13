import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faTimes } from "@fortawesome/free-solid-svg-icons";

import media from "../assets/media.png";
import gif from "../assets/gif.png";
import poll from "../assets/poll.png";
import emoji from "../assets/emoji.png";
import schedule from "../assets/schedule.png";

import lists from "../data/createTweet.json";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/Query";
import { ADD_POST } from "../graphql/Mutation";

const CreatePost = ({ auth, user }) => {
  const [inputText, setInputText] = useState("");
  const [foc, setFoc] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [image, setImage] = useState("");

  const { data } = useQuery(GET_USER, {
    variables: {
      uid: auth,
    },
  });

  const [addPost] = useMutation(ADD_POST);

  const onSubmit = async () => {
    const { uid, name, nickname, imageUrl } = data.userById;

    const res = await addPost({
      variables: {
        text: inputText.trim(),
        photoUrl: image.trim(),
        posterUid: uid,
        posterName: name,
        posterNickname: nickname,
        posterImageurl: imageUrl,
      },
    });

    setInputText("");
    document.querySelector("#caption").innerText = "";
    setImage("");
  };

  return (
    <div className="p-4 flex border-b-[1px] border-gray-200">
      <div
        className="w-12 h-12 mr-3 rounded-full bg-gray-500 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${data && data.userById.imageUrl}')`,
        }}
      ></div>

      <div className="relative flex-1">
        {!inputText && (
          <p className="absolute text-xl py-3 pointer-events-none">
            What's happening?
          </p>
        )}

        <div
          id="caption"
          className="text-xl w-full py-3 outline-none"
          contentEditable="true"
          value={inputText}
          onInput={(e) => setInputText(e.target.innerText)}
          onClick={() => !foc && setFoc(true)}
        />

        {addImage && (
          <div className="relative border-2 border-gray-300 rounded-md mb-2 flex items-center">
            <input
              type="text"
              placeholder="Image or gif URL only!"
              className="w-full text-[15px] py-2 px-4 bg-transparent outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <div
              className="absolute w-6 h-6 rounded-full right-2 grid place-items-center bg-gray-200 hover:brightness-90 cursor-pointer"
              onClick={() => {
                setAddImage(false);
                setImage("");
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 text-sm"
              />
            </div>
          </div>
        )}

        {foc && (
          <div className="pb-2 border-b-[1px] border-gray-200 relative">
            <a
              href="#"
              className="block w-[fit-content] p-1 px-3 text-sm text-twit font-semibold rounded-full hover:bg-hovLight -translate-x-2"
            >
              <FontAwesomeIcon icon={faGlobeAsia} className="mr-1" /> Everyone
              can reply
            </a>
          </div>
        )}

        <div className="flex justify-between mt-3">
          <div className="flex items-center">
            {lists.map((list) => (
              <div
                key={list}
                className="w-[34px] h-[34px] rounded-full grid place-items-center cursor-pointer hover:bg-hovLight"
                onClick={() => list === "Media" && setAddImage(true)}
              >
                <img
                  src={
                    list === "Media"
                      ? media
                      : list === "GIF"
                      ? gif
                      : list === "Poll"
                      ? poll
                      : list === "Emoji"
                      ? emoji
                      : list === "Schedule"
                      ? schedule
                      : ""
                  }
                  className="w-[20px] h-[20px]"
                  alt=""
                />
              </div>
            ))}
          </div>

          {data && (
            <button
              className={`px-5 py-2 bg-sec text-[15px] text-white font-semibold rounded-full hover:bg-blue-700 duration-200 ${
                !inputText && "pointer-events-none bg-opacity-30"
              }`}
              onClick={onSubmit}
            >
              Tweet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
