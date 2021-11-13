import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCog,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const RightNavbar = () => {
  return (
    <div className="w-full pl-3 mb-20">
      {/* Search Section */}
      <div className="sticky top-[-30vh] self-center">
        <div className="relative bg-gray-100 rounded-full mt-1 px-4 flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="w-full bg-transparent text-base p-3 outline-none pl-7"
          />
        </div>

        {/* Trend Section */}
        <div className="bg-gray-100 rounded-xl mt-3 py-3 px-4 ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Trend for you</h1>
            <FontAwesomeIcon icon={faCog} className="text-gray-400 text-lg" />
          </div>

          <div className="pt-4 pb-1">
            <div className="flex items-center justify-between">
              <p className="text-sec text-[13px]">Entertainment · Trending</p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-sec text-sm"
              />
            </div>
            <h1 className="text-[15px] font-semibold">#Bitcoin</h1>
            <p className="text-[13px] text-sec">312k Tweets</p>
          </div>

          <div className="pt-4 pb-1">
            <div className="flex items-center justify-between">
              <p className="text-sec text-[13px]">Entertainment · Trending</p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-sec text-sm"
              />
            </div>
            <h1 className="text-[15px] font-semibold">#Bitcoin</h1>
            <p className="text-[13px] text-sec">312k Tweets</p>
          </div>

          <div className="pt-4 pb-1">
            <div className="flex items-center justify-between">
              <p className="text-sec text-[13px]">Entertainment · Trending</p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-sec text-sm"
              />
            </div>
            <h1 className="text-[15px] font-semibold">#Bitcoin</h1>
            <p className="text-[13px] text-sec">312k Tweets</p>
          </div>

          <div className="pt-4 pb-1">
            <div className="flex items-center justify-between">
              <p className="text-sec text-[13px]">Entertainment · Trending</p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-sec text-sm"
              />
            </div>
            <h1 className="text-[15px] font-semibold">#Bitcoin</h1>
            <p className="text-[13px] text-sec">312k Tweets</p>
          </div>

          <div className="pt-4 pb-1">
            <div className="flex items-center justify-between">
              <p className="text-sec text-[13px]">Entertainment · Trending</p>
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="text-sec text-sm"
              />
            </div>
            <h1 className="text-[15px] font-semibold">#Bitcoin</h1>
            <p className="text-[13px] text-sec">312k Tweets</p>
          </div>
        </div>

        {/* Who to follow Section */}
        <div className="bg-gray-100 rounded-xl mt-3 py-3 px-4">
          <h1 className="text-xl font-bold">Who to follow</h1>

          <div className="flex py-3">
            <div className="w-12 h-12 mr-4 rounded-full bg-gray-400"></div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-[15px] font-semibold">Alibaba Cloud</h1>
                <p className="text-[15px] text-sec">@alibaba_cloud</p>
              </div>
              <button className="py-2 px-4 text-sm text-white font-semibold bg-gray-900 rounded-full hover:bg-gray-700 duration-200">
                Follow
              </button>
            </div>
          </div>

          <div className="flex py-3">
            <div className="w-12 h-12 mr-4 rounded-full bg-gray-400"></div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-[15px] font-semibold">Alibaba Cloud</h1>
                <p className="text-[15px] text-sec">@alibaba_cloud</p>
              </div>
              <button className="py-2 px-4 text-sm text-white font-semibold bg-gray-900 rounded-full hover:bg-gray-700 duration-200">
                Follow
              </button>
            </div>
          </div>

          <div className="flex py-3">
            <div className="w-12 h-12 mr-4 rounded-full bg-gray-400"></div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-[15px] font-semibold">Alibaba Cloud</h1>
                <p className="text-[15px] text-sec">@alibaba_cloud</p>
              </div>
              <button className="py-2 px-4 text-sm text-white font-semibold bg-gray-900 rounded-full hover:bg-gray-700 duration-200">
                Follow
              </button>
            </div>
          </div>

          <div className="flex py-3">
            <div className="w-12 h-12 mr-4 rounded-full bg-gray-400"></div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="text-[15px] font-semibold">Alibaba Cloud</h1>
                <p className="text-[15px] text-sec">@alibaba_cloud</p>
              </div>
              <button className="py-2 px-4 text-sm text-white font-semibold bg-gray-900 rounded-full hover:bg-gray-700 duration-200">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNavbar;
