"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useUserInfo from "@/hooks/useUserInfo";
import { socket } from "@/socket-client";
import { LoadingSliceAction,useTypedLoadingSelector } from "@/store/loading-slice";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const PersonalInformation = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const user = useUserInfo();
  const isLoading = useTypedLoadingSelector((state) => state.loadingReducer.isLoading);
  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    username: "",
    email: "",
    birthday: new Date().toISOString(),
  });
  const [passwords,setPasswords] = useState({
    old: "",
    new: ""
  });


  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(LoadingSliceAction.toggleLoading(true));
    try {
      const response = await axiosPrivate.put(
        "/api/profile",
        JSON.stringify({
          firstname: personalInfo.firstname,
          lastname: personalInfo.lastname,
          phone: personalInfo.phone,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Your profile has been updated.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    } finally {
      dispatch(LoadingSliceAction.toggleLoading(false));
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/api/profile/change-password", JSON.stringify({
        old_pswrd: passwords.old,
        new_pswrd: passwords.new
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.status === 200) {
        setPasswords({ old: "", new: "" });
        toast.success("Password successfully changed.");

        const notificationObj = {
          userId: user?.userId,
          title: 'Pasword Changed',
          description: 'Your password changed successfully',
          type: 'changePassword'
        };
      
        await axiosPrivate.post("/api/notification", JSON.stringify(notificationObj), {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        socket.emit("changePassword", { ...notificationObj });
      }
      
    } catch (error) {
      if(typeof error === 'object' && error !== null) {
        const err = error as { response: { data: { message: string } } };
        toast.error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await axiosPrivate.get("/api/profile");
        setPersonalInfo(response.data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate]);

  return (
    <>
      <form className="add-product-form" onSubmit={handleUpdateProfile}>
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
        <button
          className="rts-btn btn-primary"
          disabled={isLoading}
          style={
            isLoading
              ? {
                  opacity: 0.6,
                  cursor: "not-allowed",
                }
              : { opacity: 1 }
          }
        >
          Save Change
        </button>
      </form>

      <hr className="mt--35" />

      <form className="add-product-form" onSubmit={handleChangePassword}>
        <h2 className="title">Change Password</h2>
        <div className="input-half-area">
          <div className="single-input">
            <label htmlFor="old_pswrd">Old Password*</label>
            <input
              type="password"
              placeholder="Enter old password:"
              id="old_pswrd"
              value={passwords.old}
              onChange={(e) => {
                setPasswords((prev) => {
                  return {
                    ...prev,
                    old: e.target.value
                  }
                })
              }}
            />
          </div>
          <div className="single-input">
            <label htmlFor="new_pswrd">New Password*</label>
            <input
              type="password"
              placeholder="Enter new password:"
              id="new_pswrd"
              value={passwords.new}
              onChange={(e) => {
                setPasswords((prev) => {
                  return {
                    ...prev,
                    new: e.target.value
                  }
                })
              }}
            />
          </div>
        </div>
        <button
          className="rts-btn btn-primary"
          disabled={isLoading}
          style={
            isLoading
              ? {
                  opacity: 0.6,
                  cursor: "not-allowed",
                }
              : { opacity: 1 }
          }
        >
          Confirm
        </button>
      </form>
    </>
  );
};

export default PersonalInformation;