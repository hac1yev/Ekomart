"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { FormEvent, useEffect, useState } from "react";

const PersonalInformation = () => {
  const axiosPrivate = useAxiosPrivate();
  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    username: "",
    email: "",
    birthday: new Date().toISOString(),
  });

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    (async function() {
        try {
            const response = await axiosPrivate.get("/api/profile")            
            setPersonalInfo(response.data.user);
        } catch (error) {
            console.log(error);
        }
    })()
  }, [axiosPrivate]);

  return (
    <form
      action="#"
      className="add-product-form"
      onSubmit={handleUpdateProfile}
    >
      <h2 className="title">Personal Information</h2>
      <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="firstname">Firstname*</label>
          <input
            type="text"
            placeholder="Enter Firstname:"
            id="firstname"
            value={personalInfo.firstname}
            onChange={(e) =>
              setPersonalInfo((prev) => {
                return {
                  ...prev,
                  firstname: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="single-input">
          <label htmlFor="lastname">Lastname*</label>
          <input
            type="text"
            placeholder="Enter Lastname:"
            id="lastname"
            value={personalInfo.lastname}
            onChange={(e) =>
              setPersonalInfo((prev) => {
                return {
                  ...prev,
                  lastname: e.target.value,
                };
              })
            }
          />
        </div>
    </div>
    <div className="input-half-area">
        <div className="single-input">
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            placeholder="Enter Username:"
            id="username"
            value={personalInfo.username}
            disabled
          />
        </div>
        <div className="single-input">
          <label htmlFor="email">Email*</label>
          <input
            type="text"
            placeholder="Enter Email:"
            id="email"
            value={personalInfo.email}
            disabled
          />
        </div>
    </div>
        
        <div className="input-half-area">
            <div className="single-input">
          <label htmlFor="phone">Phone*</label>
          <input
            type="text"
            placeholder="Enter Phone:"
            id="phone"
            value={personalInfo.phone}
            onChange={(e) =>
              setPersonalInfo((prev) => {
                return {
                  ...prev,
                  phone: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="single-input">
          <label htmlFor="birthday">Birthday*</label>
          <input
            type="date"
            id="birthday"
            value={personalInfo.birthday.split("T")[0]}
            disabled
          />
        </div>
        </div>
      <div className="single-input">
        <label htmlFor="role">Role*</label>
        <input
          type="text"
          placeholder="Enter Role:"
          id="role"
          value={personalInfo.role}
          disabled
        />
      </div>
      <button className="rts-btn btn-primary">Save Change</button>
    </form>
  );
};

export default PersonalInformation;