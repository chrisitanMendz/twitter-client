import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

import reply from "../assets/reply.png";
import like from "../assets/like.png";

import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_POST, GET_USER } from "../graphql/Query";

import { useNavigate } from "react-router-dom";
import { ADD_COMMENT, REMOVE_POST, UPDATE_LIKE } from "../graphql/Mutation";

// Components
import Comment from "./Comment";

const PostMain = ({ auth }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const { data } = useQuery(GET_POST, {
    variables: {
      id,
    },
    pollInterval: 500,
  });

  const { data: user } = useQuery(GET_USER, {
    variables: {
      uid: auth,
    },
  });

  const [deletePost] = useMutation(REMOVE_POST);
  const [addComment] = useMutation(ADD_COMMENT);
  const [updateLike] = useMutation(UPDATE_LIKE);

  const submitTweet = (e) => {
    e.preventDefault();

    if (text) {
      addComment({
        variables: {
          id: data.post._id,
          uid: user.userById.uid,
          photoUrl: user.userById.imageUrl,
          name: user.userById.name,
          nickname: user.userById.nickname,
          text,
        },
      });
      setText("");
    }
  };

  const toDelete = async () => {
    const res = await deletePost({
      variables: {
        id: data.post._id,
      },
    });
    if (res) {
      navigate(-1);
    }
  };

  let isLike;
  if (data) {
    isLike = data.post.likes.filter((like) => like.uid === auth);
  }

  const toUpdateLike = () => {
    updateLike({
      variables: {
        postID: id,
        uid: user.userById.uid,
        photoUrl: user.userById.imageUrl,
        name: user.userById.name,
        nickname: user.userById.nickname,
      },
    });
  };

  return (
    <div className="border-l-[1px] border-r-[1px] border-gray-200 mx-4 pb-72">
      {data && (
        <div>
          <div className="text-xl px-4 py-2 font-semibold border-b-[1px] border-gray-200 flex items-center">
            <div
              className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-gray-100 cursor-pointer duration-200"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
            </div>
            <div className="ml-5">
              <h1 className="">Tweet</h1>
            </div>
          </div>

          {/* Post info */}
          <div className="p-4">
            {/* Poster info */}
            <div className="flex items-center">
              <div
                className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url('${data.post.posterImageurl}')`,
                }}
              ></div>

              <div className="pl-2">
                <h1
                  className="text-[15px] font-semibold leading-4 cursor-pointer hover:underline"
                  onClick={() => navigate(`/profile/${data.post.posterUid}`)}
                >
                  {data.post.posterName}
                </h1>
                <p
                  className="text-[15px] text-sec cursor-pointer hover:underline"
                  onClick={() => navigate(`/profile/${data.post.posterUid}`)}
                >
                  @{data.post.posterNickname}
                </p>
              </div>

              {auth === data.post.posterUid && (
                <div className="flex-1 flex justify-end">
                  <div
                    className="w-7 h-7 right-2 rounded-full grid place-items-center hover:brightness-90 cursor-pointer"
                    onClick={toDelete}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-gray-300 pointer-events-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            <pre className="whitespace-pre-wrap mt-3 text-[23px] font-sans">
              {data.post.text}
            </pre>

            {/* Image */}
            {data.post.photoUrl && (
              <img
                src={data.post.photoUrl}
                alt=""
                className="w-full mt-3 rounded-2xl"
              />
            )}

            {/* likes and comments */}
            <div className="flex items-center mt-3 py-3 px-2 border-t-[1px] border-b-[1px] border-gray-200">
              <p className="text-[15px] text-sec">
                <span className="font-semibold">
                  {data.post.comments ? data.post.comments.length : "0"}
                </span>{" "}
                Replies
              </p>

              <p className="text-[15px] text-sec ml-8">
                <span className="font-semibold">
                  {data.post.likes ? data.post.likes.length : "0"}
                </span>{" "}
                Likes
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-around py-2 border-b-[1px] border-gray-200">
              <div className="w-[35px] h-[35px] grid place-items-center rounded-full cursor-pointer hover:bg-hovLight">
                <img src={reply} alt="" className="w-[19px] h-[19px]" />
              </div>

              <div
                className={`w-[35px] h-[35px] grid place-items-center rounded-full cursor-pointer hover:bg-hovLight ${data.post.likes.map(
                  (like) => like.uid === auth && " hover:bg-red-100 bg-red-100"
                )}`}
                onClick={toUpdateLike}
              >
                <img src={like} alt="" className="w-[19px] h-[19px]" />
              </div>
            </div>

            {/* Tweet your reply */}
            {user && (
              <form onSubmit={submitTweet}>
                <div className="py-4 border-b-[1px] border-gray-200 flex items-center">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center"
                    style={{
                      backgroundImage: `url('${user.userById.imageUrl}')`,
                    }}
                  ></div>

                  <input
                    className="flex-1 ml-4 text-xl outline-none"
                    type="text"
                    placeholder="Tweets your reply"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  <button
                    className={`text-[15px] bg-sec text-white h-[fit-content] px-4 py-2 rounded-full ${
                      !text && "pointer-events-none opacity-30"
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}

            {data.post.comments && (
              <>
                {data.post.comments
                  .slice()
                  .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                  })
                  .map((comment) => (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      auth={auth}
                      id={data.post._id}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMain;
