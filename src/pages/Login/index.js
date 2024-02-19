import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toastError, toastSuccess } from "../../components/Notifications";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/authContext";

import Input from "@mui/joy/Input";

const Login = () => {
  const { login } = useAuth();
  const authContext = useAuthContext();
  const { addUser } = authContext;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetValues = () => {
    setUsername("");
    setPassword("");
  };

  const loginTrigger = async () => {
    setLoading(true);
    if (username === "" || password === "") {
      toastError("Please fill the values");
      return setLoading(false);
    }

    const payload = {
      emailAddress: username,
      password,
    };

    const response = await login(payload);
    setLoading(true);
    if (response) {
      if (response?.user) {
        toastSuccess("Logged in successful");
        resetValues();

        addUser(response.user, response.token);
        return setLoading(false);
      } else {
        toastError(response?.message ?? "Something went wrong");
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
            <h1 className="text-3xl font-bold my-2">Login</h1>
            <p className="">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/sign-up");
                }}
                className="cursor-pointer text-blue-500"
              >
                Sign up now
              </span>
            </p>
          </div>

          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=" w-full my-2 text-[16px] font-normal"
            placeholder="Enter your email address"
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
              onClick={loginTrigger}
              className="bg-primary hover:bg-primary-accent text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
