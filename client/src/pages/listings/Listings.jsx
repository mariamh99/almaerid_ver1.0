import React, { useEffect, useRef, useState } from "react";
import "./Listings.scss";
import ListingCard from "../../components/listingCard/ListingCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Listings() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();


  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["listings"],
    queryFn: () =>
      
        newRequest
        .get(
          `/listings${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        })
      },
  );


  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort,search]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="listings">
      <div className="container">
        <span className="breadcrumbs">Al Maerid {'>'} {search.split("=")[1].replaceAll("%20"," ")} {'>'}</span>
        <h1>{search.split("=")[1].replaceAll("%20"," ")}</h1>

        <div className="menu">
        <div className="left">
  <span>Price</span>
  <input ref={minRef} type="number" placeholder="min" />
  <span>$</span>
  <input ref={maxRef} type="number" placeholder="max" />
  <span>$</span>

  <button onClick={apply}>Apply</button>
</div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((listing) => <ListingCard key={listing._id} item={listing} />)}
        </div>
      </div>
    </div>
  );
}

export default Listings;