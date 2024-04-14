import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import getCurrentUser from "../../utils/getCurrentUser";
const Reviews = ({ listingId }) => {
const user=getCurrentUser();
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${listingId}`).then((res) => {
        return res.data;
      }),
  });

  const [feedback,setFeedback]=useState("");
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review).then((res)=>{
        setFeedback("Added feedback")
      });
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ listingId, desc, star });
  };
  const [canReview,setCanReview]=useState(true)

  useEffect(()=>{
    if(user){
      newRequest.post("/reviews/check",{
        "userId":user._id,
        "listingId":listingId
      }).then((res)=>{
        setCanReview(true)
      }).catch((err)=>{     setCanReview(false)
      });
    }
   
  },[])
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        {user && user._id && !user.isSeller ? !canReview?<span>You can't create a review for a listing you didn't purchase!</span>: (<form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>):<span>Login as a buyer in order to add review</span>}
        {feedback}
      </div>
    </div>
  );
};

export default Reviews;