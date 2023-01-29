import React, { useContext, useState } from "react";

import { AuthContext } from "../../Context/AuthProvider";
import Modal from "../../components/SearchNave/Modal";
import BillingList from "../../components/BillingList/BillingList";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);

  // New Code

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(count / size);

  // new code

  // console.log(user);
  const [search, setSearch] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  // for search button

  const { data: billings = [""], refetch } = useQuery({
    queryKey: ["billings"],
    queryFn: async () => {
      const url = `https://power-hack-six.vercel.app/api/billing-list?email=${search}&name=${search}&phone=${search}&page=${page}&size=${size}`;
      const res = await fetch(url);
      const data = await res.json();
      setCount(data.count);
      return data.cursor;
    },
  });

  // console.log(billings);

  const handlerPagination = (number) => {
    setPage(number);
    refetch();
  };

  const handleSearch = (event) => {
    // console.log(search);
    event.preventDefault();
    const searchs = event.target.search.value;
    setSearch(searchs);
    refetch();
  };

  return (
    <div>
      {/* search Header */}

      <div className="container mx-auto">
        <div className=" px-2 py-2 mb-6 mt-4 rounded-lg border shadow-lg flex items-center justify-between">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by name,email or phone"
                name="search"
                value={search}
                className="input input-bordered"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div>
            <div>
              <label
                htmlFor="my-modal"
                className="btn"
                onClick={() => setUserInfo(user)}
              >
                Add New
              </label>
            </div>
          </div>
        </div>

        {userInfo && (
          <Modal
            userInfo={userInfo}
            refetch={refetch}
            setUserInfo={setUserInfo}
            setLoading={setLoading}
          >
            {" "}
          </Modal>
        )}
      </div>

      {/* search Header end */}

      {/* Billing List */}

      <div className="container mx-auto">
        <BillingList
          billings={billings}
          loading={loading}
          refetch={refetch}
        ></BillingList>
      </div>

      {/* new code */}

      <div className="text-center flex justify-center my-4">
        {[...Array(page).keys()] &&
          [...Array(pages).keys()].map((number) => {
            console.log(number);

            return (
              <button
                key={number}
                value={number}
                onMouseMove={() => setPage(number)}
                onClick={() => handlerPagination(number)}
              >
                {" "}
                <span className="mx-3 border border-blue-500 py-1 px-2 rounded">
                  {" "}
                  {number + 1}
                </span>
              </button>
            );
          })}
      </div>

      {/* new code */}
    </div>
  );
};

export default Home;
