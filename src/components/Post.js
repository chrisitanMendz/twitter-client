import reply from "../assets/reply.png";
import like from "../assets/like.png";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_POST, UPDATE_LIKE } from "../graphql/Mutation";
import { GET_USER } from "../graphql/Query";

const Post = ({ post, id }) => {
  const navigate = useNavigate();
  const createdAtInt = parseInt(
    post.createdAt.substring(0, post.createdAt.length - 3)
  );

  const { data: user } = useQuery(GET_USER, {
    variables: {
      uid: id,
    },
  });

  const [deletePost] = useMutation(REMOVE_POST);
  const [updateLike] = useMutation(UPDATE_LIKE);

  const toDelete = () => {
    deletePost({
      variables: {
        id: post._id,
      },
    });
  };

  const toUpdateLike = () => {
    updateLike({
      variables: {
        postID: post._id,
        uid: user.userById.uid,
        photoUrl: user.userById.imageUrl,
        name: user.userById.name,
        nickname: user.userById.nickname,
      },
    });
  };

  const toViewPost = () => {
    navigate(`/post/${post._id}`);
  };

  const toViewProfile = () => {
    navigate(`/profile/${post.posterUid}`);
  };

  return (
    <div className="relative px-4 pt-4 pb-2 flex border-b-[1px] border-gray-200 hover:bg-gray-50">
      <div
        className="w-12 h-12 mr-3 rounded-full bg-gray-500 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('${post.posterImageurl}')` }}
      ></div>

      <div className="flex-1 relative">
        {id === post.posterUid && (
          <div
            className="absolute w-7 h-7 right-2 rounded-full grid place-items-center hover:brightness-90"
            onClick={toDelete}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="text-gray-300 pointer-events-none"
            />
          </div>
        )}

        <h1 className="text-[15px] font-semibold mb-1">
          <span
            className="mr-1 hover:underline cursor-pointer"
            onClick={toViewProfile}
          >
            {post.posterName}
          </span>
          <span className="text-sec font-normal">@{post.posterNickname}</span>
        </h1>

        <div className="cursor-pointer" onClick={toViewPost}>
          <pre className="whitespace-pre-wrap text-[15px] font-sans">
            {post.text}
          </pre>

          {post.photoUrl && (
            <img
              src={post.photoUrl}
              alt=""
              className="w-full mt-3 rounded-2xl"
            />
          )}
        </div>

        {/* BUttons */}
        <div className="max-w-[200px] mt-2 flex justify-between">
          <div
            className="group flex items-center cursor-pointer"
            onClick={toViewPost}
          >
            <div className="w-[35px] h-[35px] grid place-items-center rounded-full group-hover:bg-hovLight">
              <img src={reply} alt="" className="w-[19px] h-[19px]" />
            </div>
            <p className="text-[13px] text-sec px-3 group-hover:text-twit">
              {post.comments ? post.comments.length : "0"}
            </p>
          </div>

          <div
            className="group flex items-center cursor-pointer"
            onClick={toUpdateLike}
          >
            <div
              className={`w-[35px] h-[35px] grid place-items-center rounded-full group-hover:bg-hovLight
              ${post.likes.map(
                (like) =>
                  like.uid === id && " group-hover:bg-red-100 bg-red-100"
              )}
              `}
            >
              <img src={like} alt="" className="w-[19px] h-[19px]" />
            </div>
            <p
              className={`text-[13px] text-sec px-3 group-hover:text-twit
              ${post.likes.map(
                (like) =>
                  like.uid === id && " group-hover:text-red-400 text-red-400"
              )}
            `}
            >
              {post.likes ? post.likes.length : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
