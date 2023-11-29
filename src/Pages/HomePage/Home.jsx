import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ContextCard from "../../Components/Sheard/ContextCard";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
  const { data: WinData, isPending: isWinLoading } = useQuery({
    queryKey: ["isWin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allWinsubmission`);
      return res.data;
    },
  });

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

  return (
    <div>
      {/* Banner/search */}

      <div className="mt-16">
        <div className="text-center space-y-3">
          <h3 className="text-4xl font-bold">Our Popular Contest</h3>
        </div>
        <div className=" max-w-7xl m-auto px-5">
          <ContextCard
            ContextData={topContest}
            loading={isContestLoading}
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
                navigation={true}
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
                            <img src={data.userImg} alt="car!" />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title text-2xl font-bold">
                              Winner of : {data.contestName}
                            </h2>
                            <p className="card-title">{data.userName}</p>
                            <p className="card-title text-left hidden md:inline">
                              Email: {data.userEmail}
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
