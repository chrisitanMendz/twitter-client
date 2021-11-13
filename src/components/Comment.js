import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT } from "../graphql/Mutation";

const Comment = ({ comment, auth, id }) => {
  const [removeComment] = useMutation(REMOVE_COMMENT);

  const toRemoveComment = () => {
    removeComment({
      variables: {
        postID: id,
        commentID: comment._id,
      },
    });
  };

  return (
    <div key={comment._id} className="border-b-[1px] border-gray-200 flex py-4">
      <div
        className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${comment.photoUrl}')`,
        }}
      ></div>

      <div className="ml-2 py-1 flex-1">
        <div className="flex items-center">
          <h1 className="text-[15px] font-semibold flex-1">{comment.name}</h1>

          {comment.uid === auth && (
            <button
              className="px-3 hover:brightness-90"
              onClick={toRemoveComment}
            >
              <FontAwesomeIcon icon={faTrash} className="text-gray-300" />
            </button>
          )}
        </div>

        <p className="text-[13px] text-sec mt-[-5px]">@{comment.nickname}</p>

        <pre className="whitespace-pre-wrap mt-4 text-[15px] font-sans">
          {comment.text}
        </pre>
      </div>
    </div>
  );
};

export default Comment;
