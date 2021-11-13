import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

// Graphql
import { useQuery } from "@apollo/client";
import { GET_POSTS, GET_USER } from "../graphql/Query";
import { timeConverter } from "./convertTimestamp";
import Post from "./Post";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

const Profile = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      uid: id,
    },
  });

  const { data: userPost } = useQuery(GET_POSTS, {
    variables: {
      uid: id,
    },
  });

  let createdAtInt;
  let newDate;
  let filterPost;

  if (userPost) {
    filterPost = userPost.posts.filter((each) => each.posterUid === id);
  }

  if (data) {
    createdAtInt = parseInt(
      data.userById.createdAt.substring(0, data.userById.createdAt.length - 3)
    );
    newDate = timeConverter(createdAtInt);
  }

  return (
    <>
      {loading && <h1>Loading ...</h1>}
      {!loading && !data && <h1>Walaa</h1>}

      {data && (
        <div className="border-l-[1px] border-r-[1px] border-gray-200 mx-4 pb-72">
          {/* Header */}
          <div className="text-xl px-4 py-2 font-semibold border-b-[1px] border-gray-200 flex items-center">
            <div
              className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-gray-100 cursor-pointer duration-200"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
            </div>
            <div className="ml-5">
              <h1 className="">{data.userById.name}</h1>
              <p className="text-sec text-[13px] font-normal leading-3">
                {data.userById.tweets ? "0 Tweets" : "0 Tweets"}
              </p>
            </div>
          </div>

          {/* Profile and Background Image */}
          <div className="bg-gray-300 h-52 relative">
            <div
              className="absolute h-[133px] w-[133px] bottom-0 translate-y-1/2 left-3 bg-gray-300 border-4 border-white rounded-full bg-cover bg-no-repeat bg-center overflow-hidden"
              style={{
                backgroundImage: `url('${data.userById.imageUrl}')`,
              }}
            ></div>
          </div>

          {/* Info */}
          <div className="flex flex-col py-3 px-4">
            <div className="grid pb-5 opacity-0">
              <button className="w-[fit-content] place-self-end bg-gray-900 text-[15px] text-white font-semibold rounded-full py-[6px] px-4 pointer-events-none">
                Follow
              </button>
            </div>

            <div>
              <h1 className="text-xl font-bold">{data.userById.name}</h1>
              <p className="text-[15px] text-sec leading-4">
                @{data.userById.nickname}
              </p>
            </div>

            <div className="flex items-center py-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-sec mr-2" />
              <p className="text-sec text-[15px]">{newDate}</p>
            </div>

            <div className="flex">
              <p className="text-[15px] text-sec pr-5">
                <span className="text-prim font-semibold">
                  {data.userById.followings ? "0" : "0"}
                </span>{" "}
                Following
              </p>
              <p className="text-[15px] text-sec">
                <span className="text-prim font-semibold">
                  {data.userById.followers ? "0" : "0"}
                </span>{" "}
                Followers
              </p>
            </div>
          </div>

          {/* Mini navbar */}
          <ul className="flex justify-between mt-3 border-b-[1px] border-gray-200">
            {["Tweets", "Tweets & replies", "Media", "Likes"].map((each) => (
              <li
                key={each}
                className="hover:bg-gray-100 flex-1 flex justify-center cursor-pointer"
              >
                <button
                  className={`block py-4 text-sec text-[15px] font-medium ${
                    each === "Tweets" && "border-b-4 border-blue-500"
                  } `}
                >
                  {each}
                </button>
              </li>
            ))}
          </ul>

          {userPost && (
            <>
              {userPost.posts.map((post) => (
                <React.Fragment key={post._id}>
                  {post.posterUid === id && <Post key={post._id} post={post} />}
                </React.Fragment>
              ))}
              {filterPost?.length === 0 && (
                <h1 className="text-[15px] text-sec text-center mt-10">
                  {data.userById.firstName} does'nt have any tweets!
                </h1>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
