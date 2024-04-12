import React from "react";
import { Link } from "react-router-dom";
import "./MyListings.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyListings() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myListings"],
    queryFn: () =>
      newRequest.get(`/listings?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/listings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myListings"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myListings">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Listings</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Listing</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((listing) => (
              <tr key={listing._id}>
                <td>
                  <img className="image" src={`${import.meta.env.VITE_BACKEND}/${listing.cover}`} alt="" />
                </td>
                <td>{listing.title}</td>
                <td>{listing.price}</td>
                <td>{listing.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(listing._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyListings;