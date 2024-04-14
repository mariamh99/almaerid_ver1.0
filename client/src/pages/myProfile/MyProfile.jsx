import React, { useState } from "react";
import upload from "../../utils/upload";
import "./MyProfile.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";

function MyProfile() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
const userData=getCurrentUser();
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const [user, setUser] = useState({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    isSeller: userData.isSeller,
    desc: userData.desc,
    phone: userData.phone,
  });
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("isSeller", user.isSeller);
      formData.append("phone", user.phone);
      formData.append("desc", user.desc);
      formData.append("file", file);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      await newRequest.post("/auth/edit", formData).then(async (res)=>{
        await newRequest.post("/auth/logout");
        localStorage.setItem("currentUser", null);
        navigate("/");
      });
  
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const [error, setError] = useState();

  return (
    <div className="myProfile">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Edit your accoutn</h1>
          <label htmlFor="">Username</label>
          <input name="username" type="text" value={user.username} onChange={handleChange} />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            value={user.email}
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" value={user.password} type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {error && <span style={{ color: "red" }}>{error}</span>}
          <button type="submit">MyProfile</button>
        </div>
        <div className="right">
          <h1>Become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
            <input type="checkbox" onChange={handleSeller} checked={user.isSeller ? true : false} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <div style={{width:"100%",display:"flex",alignItems:"center"}}>
          <span style={{marginRight:10}}>+973</span>
          <input
            name="phone"
            type="text"
            style={{width:"100%"}}
            value={user.phone} // Set the value to the phone state
            onChange={handleChange}
          />
          </div>
         
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            value={user.desc}
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default MyProfile;
