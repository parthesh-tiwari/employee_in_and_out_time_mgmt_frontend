import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toastError, toastSuccess } from "../../components/Notifications";
import useAuth from "../../hooks/useAuth";

import { removeDashesAndJoin } from "../../constants/helperfunctions";

import Input from "@mui/joy/Input";

import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const resetValues = () => {
    setUsername("");
    setPassword("");
    setFullName("");
    setCompanyName("");
    setEmailAddress("");
    setMobileNumber("");
  };

  const signUpTrigger = async () => {
    setLoading(true);
    if (username === "" || password === "") {
      toastError("Please fill the values");
      return setLoading(false);
    }

    const generatedCompanyId = uuidv4();
    const removedDashCompanyId = removeDashesAndJoin(generatedCompanyId);
    const finalCompanyId = removedDashCompanyId?.substring(0, 10).toUpperCase();

    const payload = {
      emailAddress,
      password,
      username,
      companyName,
      fullName,
      mobileNumber,
      companyId: finalCompanyId,
    };

    const response = await register(payload);

    if (response) {
      if (response) {
        toastSuccess("Registeration successful");
        resetValues();

        return setLoading(false);
      } else {
        toastError("Failed to create the user");
        return setLoading(false);
      }
    } else {
      toastError("Server error, try again later");
      return setLoading(false);
    }
  };

  return loading ? (
    <>Laoding...</>
  ) : (
    <div className="h-[92vh] w-full flex items-center justify-center">
      <div className="w-[480px] shadow-md p-5 rounded-md border-t-4 border-blue-700">
        <div>
          <div className="text-left mb-5">
            <h1 className="text-3xl font-bold my-2">Create Account</h1>
            <p className="">
              Already have an account ?
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="cursor-pointer text-blue-500"
              >
                Login now
              </span>
            </p>
          </div>

          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter your full name"
          />

          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter your username"
          />

          <Input
            type="text"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter your email address"
          />

          <Input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter your mobile number"
          />

          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter the company Name"
          />

          <Input
            type="password"
            className=" w-full my-2 text-[16px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="text-right my-2">
            <button
              onClick={signUpTrigger}
              className="bg-primary hover:bg-primary-accent text-white font-semibold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
