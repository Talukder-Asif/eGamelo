import { useEffect, useState } from "react";
import "./contest.css";
import ContextCard from "../../Components/Sheard/ContextCard";
import useAxios from "../../Hooks/useAxios";
import PageName from "../../Components/PageName";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const AllContest = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();
  const [Contest, setContest] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    if (tabIndex === 0) {
      axiosPublic.get("/totalContest").then((res) => {
        setTotalItems(res.data?.length);
        setCurrentPage(0);
        setPageLoad(false);
      });
    }
    if (tabIndex === 1) {
      axiosPublic.get("/totalContest/?cat=Business Contest").then((res) => {
        setTotalItems(res.data?.length);
        setCurrentPage(0);
        setPageLoad(false);
      });
    }
    if (tabIndex === 2) {
      axiosPublic.get("/totalContest/?cat=Medical Contest").then((res) => {
        setTotalItems(res.data?.length);
        setCurrentPage(0);
        setPageLoad(false);
      });
    }
    if (tabIndex === 3) {
      axiosPublic.get("/totalContest/?cat=Article Writing").then((res) => {
        setTotalItems(res.data?.length);
        setCurrentPage(0);
        setPageLoad(false);
      });
    }
    if (tabIndex === 4) {
      axiosPublic.get("/totalContest/?cat=Gaming").then((res) => {
        setTotalItems(res.data?.length);
        setCurrentPage(0);
        setPageLoad(false);
      });
    }
  }, [axiosPublic, tabIndex]);

  useEffect(() => {
    if (tabIndex === 0) {
      fetch(
        `http://localhost:5000/usersAllContest/?page=${currentPage}&size=${itemsPerPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          setContest(data);
          setLoading(false);
        });
    }
    if (tabIndex === 1) {
      fetch(
        `http://localhost:5000/usersAllContest/?page=${currentPage}&size=${itemsPerPage}&cat=Business Contest`
      )
        .then((res) => res.json())
        .then((data) => {
          setContest(data);
          setLoading(false);
        });
    }
    if (tabIndex === 2) {
      fetch(
        `http://localhost:5000/usersAllContest/?page=${currentPage}&size=${itemsPerPage}&cat=Medical Contest`
      )
        .then((res) => res.json())
        .then((data) => {
          setContest(data);
          setLoading(false);
        });
    }
    if (tabIndex === 3) {
      fetch(
        `http://localhost:5000/usersAllContest/?page=${currentPage}&size=${itemsPerPage}&cat=Article Writing`
      )
        .then((res) => res.json())
        .then((data) => {
          setContest(data);
          setLoading(false);
        });
    }
    if (tabIndex === 4) {
      fetch(
        `http://localhost:5000/usersAllContest/?page=${currentPage}&size=${itemsPerPage}&cat=Gaming`
      )
        .then((res) => res.json())
        .then((data) => {
          setContest(data);
          setLoading(false);
        });
    }
  }, [currentPage, itemsPerPage, tabIndex]);

  // eslint-disable-next-line no-unused-vars
  const handlePagination = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  // Search
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // const filterFood = foodData.filter(item => item.name.toLowerCase().includes(e.target.search.value.toLowerCase()))
  //   // setContest(filterFood);
  //   setsearching("true");
  //   axios
  //     .get("http://localhost:5000/usersAllContest/search", {
  //       params: {
  //         query: e.target.search.value.toLowerCase(),
  //       },
  //     })
  //     .then((response) => {
  //       setContest(response?.data);
  //       if (response?.data.length == 0) {
  //         setsearchingItem(false);
  //       } else {
  //         setsearchingItem(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error searching for items:", error);
  //     });
  // };

  if (loading) {
    return (
      <div className="h-screen w-screen grid content-center justify-center">
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
        <h1 className="text-4xl md:text-7xl font-bold">Loading....</h1>
      </div>
    );
  }
  if (pageLoad) {
    return (
      <div className="h-screen w-screen grid content-center justify-center">
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
      <PageName pageName={"All Contest"}></PageName>
      

      <Tabs
        className={"mt-10 text-center font-semibold"}
        defaultIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab
            onClick={() => {
              setLoading(true);
              setPageLoad(true);
            }}
          >
            All
          </Tab>
          <Tab
            onClick={() => {
              setLoading(true);
              setPageLoad(true);
            }}
          >
            Business Contest
          </Tab>
          <Tab
            onClick={() => {
              setLoading(true);
              setPageLoad(true);
            }}
          >
            Medical Contest
          </Tab>
          <Tab
            onClick={() => {
              setLoading(true);
              setPageLoad(true);
            }}
          >
            Article Writing
          </Tab>
          <Tab
            onClick={() => {
              setLoading(true);
              setPageLoad(true);
            }}
          >
            Gaming
          </Tab>
        </TabList>
        <TabPanel className={'pb-6'}>
          <ContextCard ContextData={Contest}></ContextCard>

          {totalItems > 9 ? (
            <div className="pagination ">
              {pages.map((page) => (
                <button
                  className={currentPage === page ? "selected" : "notselect"}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          ) : null}
        </TabPanel>
        <TabPanel className={'-mt-10 pb-6'}>
          <ContextCard ContextData={Contest}></ContextCard>

          {totalItems > 9 ? (
            <div className="pagination ">
              {pages.map((page) => (
                <button
                  className={currentPage === page ? "selected" : "notselect"}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          ) : null}
        </TabPanel>
        <TabPanel className={'-mt-10 pb-6'}>
          <ContextCard ContextData={Contest}></ContextCard>

          {totalItems > 9 ? (
            <div className="pagination ">
              {pages.map((page) => (
                <button
                  className={currentPage === page ? "selected" : "notselect"}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          ) : null}
        </TabPanel>
        <TabPanel className={'-mt-10 pb-6'}>
          <ContextCard ContextData={Contest}></ContextCard>

          {totalItems > 9 ? (
            <div className="pagination ">
              {pages.map((page) => (
                <button
                  className={currentPage === page ? "selected" : "notselect"}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          ) : null}
        </TabPanel>
        <TabPanel className={'-mt-10 pb-6'}>
          <ContextCard ContextData={Contest}></ContextCard>

          {totalItems > 9 ? (
            <div className="pagination ">
              {pages.map((page) => (
                <button
                  className={currentPage === page ? "selected" : "notselect"}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          ) : null}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AllContest;
