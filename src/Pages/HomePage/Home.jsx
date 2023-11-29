import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ContextCard from "../../Components/Sheard/ContextCard";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

const Home = () => {
  const breakpoints = {
    400: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 2,
    },
    700: {
      slidesPerView: 3,
    },
  };
  const axiosPublic = useAxios();
  const { data: WinDatas, isPending: isWinLoading } = useQuery({
    queryKey: ["isWin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allWinsubmission`);
      return res.data;
    },
  });
  const WinData = WinDatas?.slice(0,6)

  const { data: topContest, isPending: isContestLoading } = useQuery({
    queryKey: ["isContest"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/topContest`);
      return res.data;
    },
  });

  const { data: topContestance, isPending: isContestanceLoading } = useQuery({
    queryKey: ["isContestance"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/topcontestance`);
      return res.data;
    },
  });

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
    // Search

    const [searchingItem, setsearchingItem] = useState(true);
    const [contest, setContest] = useState([]);
    const [searching, setsearching] = useState(false)
    const [value, setValue]= useState();
  const handleSearch = (e) => {
    e.preventDefault();
    setValue(e.target.search.value)
    if(e.target.search.value ===''|| e.target.search.value===' '){
        setsearching(false)
    }
    else{
        setsearching(true);
    }
    axios
      .get("https://end-game-server-delta.vercel.app/usersAllContest/search", {
        params: {
          query: e.target.search.value.toLowerCase(),
        },
      })
      .then((response) => {
        setContest(response?.data);

        if (response?.data.length === 0) {
          setsearchingItem(false);
        } else {
          setsearchingItem(true);
        }
    })
    .catch((error) => {
        console.error("Error searching for items:", error);
    });
};
if (isContestLoading||isContestanceLoading) {
  return (
    <div className="grid min-h-[400px] content-center justify-center">
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#eb0029]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-7xl font-bold">Please Wait....</h1>
    </div>
  );
}
  return (
    <div>
      {/* Banner/search */}
      <div style={{backgroundImage: 'url(https://i.ibb.co/g9w3mQ1/Student-Studying-2-1696241336537-1-min.jpg)'}} className="bg-cover bg-no-repeat  py-10 bg-center ">
      <div  className="top-0 left-0 w-full relative">
                <div className="max-w-7xl p-5 md:p-10 m-auto md:flex items-center gap-5 ">
                <div className="md:w-7/12 lg:w-6/12 space-y-5">
                <p className="text-[#1b1d4d] text-xl italic">Welcome to EGAMLIO</p>
                <h2 className="text-3xl z-0 md:text-5xl text-[#1b1d4d] font-bold" >
                PREPARE YOURSELF FOR UPCOMING EXAM
                </h2>
                <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-[#1b1d4d] rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search with Contest tag name..."
              
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2 focus:ring-4 focus:outline-none focus:ring-[#1b1d4d63] font-medium rounded-lg text-sm px-4 py-2 border-2 border-[#1b1d4d] text-white bg-[#1b1d4d] hover:bg-white hover:text-[#1b1d4d]  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Search
            </button>
          </div>
        </form>
                </div>

                <div className="md:w-5/12 lg:w-6/12">
               
                </div>
                </div>
          </div>
    </div>

{/* Search Items */}
   {
    searching? 
    <div className="mt-16">
        <div className="text-center space-y-3">
          <h3 className="text-2xl md:text-4xl font-bold">Your Search Result</h3>
        </div>
        <div className=" max-w-7xl -mt-10 m-auto px-5">
          {
            searchingItem?
            <ContextCard
            ContextData={contest}
            loading={!searching}
          ></ContextCard>:
          <div className="py-12 mt-10 border-2 border-black">
          <h1 className="text-xl md:text-3xl text-center my-4 font-extrabold dark:text-white">
          No Contest found using &quot;{value}&quot; Tag
        </h1>
          </div>
          }
        </div>
        <div className="text-center">
        </div>
      </div> : null
   }







    
{/* Popular Items */}
      <div className="mt-16">
        <div className="text-center space-y-3">
          <h3 className="text-2xl md:text-4xl font-bold">Our Popular Contest</h3>
        </div>
        <div className=" max-w-7xl -mt-10 m-auto px-5">
          <ContextCard
            ContextData={topContest}
            loading={isContestanceLoading}
          ></ContextCard>
        </div>{" "}
        <div className="text-center">
          <Link to={"/allContests"}>
            <button className=" border-2 border-[#1b1d4d] text-white bg-[#1b1d4d] hover:bg-white hover:text-[#1b1d4d] font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              See All Contest
            </button>
          </Link>
        </div>
      </div>

      {/* Winner */}
      <div
        style={{
          backgroundImage:
            "url(https://coursebuilder.thimpress.com/demo-coursify/wp-content/uploads/sites/4/2018/08/bg.jpg)",
        }}
        className="mt-16 bg-no-repeat bg-cover bg-center"
      >
        <div className="max-w-7xl bg-black bg-opacity-50 m-auto md:py-20 p-5 lg:py-36 md:grid gap-2 grid-cols-3 lg:grid-cols-2 ">
          <div className="space-y-2 my-5 md:space-y-5">
            <p className="italic text-xl font-semibold text-white">
              Explore, Participate, Win!
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Meet Our Dazzling <br /> Contest Winner
            </h3>
          </div>
          <div className="relative col-span-2 lg:col-span-1">
            <>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
              >
                {isWinLoading
                  ? null
                  : WinData?.map((data, i) => (
                      <SwiperSlide key={i}>
                        <div className="card card-normal md:card-side p-4 w-full glass">
                          <figure className="w-36 h-36 lg:w-40 lg:h-40 rounded-full m-auto">
                            <img src={data?.userImg} alt={data.userName+" img"} />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title text-2xl font-bold">
                              Winner of : {data?.contestName}
                            </h2>
                            <p className="card-title">{data?.userName}</p>
                            <p className="card-title text-left hidden md:inline">
                              Email: {data?.userEmail}
                            </p>
                            <div className="card-actions justify-end"></div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}

                <div className="autoplay-progress" slot="container-end">
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </Swiper>
            </>
          </div>
        </div>
      </div>

      {/* Best Creators */}
      <div className="mt-16">
        <div className="text-center space-y-3">
          <h3 className="text-2xl md:text-4xl font-bold">
            Our Best Contest Creator
          </h3>
        </div>
        <div className=" max-w-7xl my-5 m-auto px-5">
          <Swiper
            breakpoints={breakpoints}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
          >
            {isContestanceLoading
              ? null
              : topContestance.map((data, i) => (
                  <SwiperSlide key={i}>
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg shadow-[#0000006c] dark:bg-gray-800 dark:border-gray-700 ">
                      <div className="flex justify-end px-4 pt-4"></div>
                      <div className="flex flex-col items-center pb-10">
                        <img
                          className="w-28 h-28 mb-3 rounded-full shadow-lg"
                          src={data?.photo}
                          alt={data?.name + ` Image`}
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {data?.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {data?.role}
                        </span>
                      <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                          Created Contest : {data?.contestAdded}
                        </h5>
                      </div>
                      <div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
