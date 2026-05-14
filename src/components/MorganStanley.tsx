"use client";

import { use, useEffect, useState } from "react";

const arrFunc = () => <p>hello world!</p>;

const MorganStanley = () => {
  const [msData, setMsData] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const newData = [];
    for (let i = 0; i < 104; i++) {
      newData.push(i);
    }

    setData(newData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://morganstanley.com");
      const data = await res.json();
      console.log(data);
      setMsData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {msData}
      {/* <iframe src="https://morganstanley.com" width="100%" height="100%"></iframe> */}

      <hr />
      {data
        .map((item, index) => {
          return (
            <div key={item}>
              <h1>{item}</h1>
            </div>
          );
        })
        .slice(
          currentPage * itemsPerPage - itemsPerPage,
          currentPage * itemsPerPage
        )}

      <div>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <br />
        {currentPage < data.length / itemsPerPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= data.length}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MorganStanley;
