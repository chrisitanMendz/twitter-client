import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/Query";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Home = ({ auth, user }) => {
  const { data } = useQuery(GET_POSTS, {
    pollInterval: 500,
  });

  const toSort = (a, b) => {
    return b.createdAt - a.createdAt;
  };

  return (
    <div className="border-l-[1px] border-r-[1px] border-gray-200 mx-4 pb-72">
      <header className="text-xl px-4 py-4 font-semibold border-b-[1px] border-gray-200">
        Home
      </header>
      <CreatePost auth={auth} user={user} />
      <div className="py-1 border-[1px] border-gray-200"></div>

      {data && (
        <>
          {data.posts
            .slice()
            .sort(toSort)
            .map((post) => (
              <Post key={post._id} post={post} id={auth} />
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
