import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const DestroyLink = () => {
  const navigate = useNavigate();

  return (
    <div className="border-l-[1px] border-r-[1px] border-gray-200 mx-4 pb-72">
      <div className="text-xl px-4 py-2 font-semibold border-b-[1px] border-gray-200 flex items-center">
        <div
          className="w-[34px] h-[34px] rounded-full grid place-items-center hover:bg-gray-100 cursor-pointer duration-200"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
        </div>
        <div className="ml-5">
          <h1 className="">Tweet</h1>
        </div>
      </div>
      <div className="flex flex-col items-center py-14">
        <h1 className="text-8xl font-semibold">404</h1>
        <p className="text-sec">
          Sorry, This page does'nt working at the moment!
        </p>
        <button
          className="px-4 py-2 mt-10 text-white font-semibold bg-sec rounded-full hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Home page
        </button>
      </div>
    </div>
  );
};

export default DestroyLink;
