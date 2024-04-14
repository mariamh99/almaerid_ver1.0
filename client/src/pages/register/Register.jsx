import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
    username: "",
    email: "",
    password: "",
    img: "",
    isSeller: false,
    desc: "",
    phone: "", 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("isSeller", user.isSeller);
      formData.append("desc", user.desc);
      formData.append("file", file);

      await newRequest.post("/auth/register", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const [error, setError] = useState();

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input name="username" type="text" onChange={handleChange} />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {error && <span style={{ color: "red" }}>{error}</span>}
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
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
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
