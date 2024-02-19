import React, { useState } from "react";

import { useAuthContext } from "../../contexts/authContext";
const ProfilePage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="md:mx-96 sm:mx-4">
        <div className="flex">
          <div className="flex-col mx-4 my-2">
            <h1 className="text-3xl font-semibold">{user?.name ?? "N/A"}</h1>
            <p>{user?.emailAddress ?? "N/A"}</p>
          </div>
        </div>
        <div className="flex-col">
          <div className="md:my-10 sm:my-2 md:flex">
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">Full Name</span>

              <div className="p-4 bg-gray-100 rounded-md">
                {user?.name ?? "N/A"}
              </div>
            </div>
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">Username</span>

              <div className="p-4 bg-gray-100 rounded-md">
                {user?.username ?? "N/A"}
              </div>
            </div>
          </div>
          <div className="md:my-10 sm:my-2 md:flex">
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">Company ID</span>

              <div className="p-4 bg-gray-100 rounded-md">
                {user?.companyId ?? "N/A"}
              </div>
            </div>
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">Company Name</span>

              <div className="p-4 bg-gray-100 rounded-md">
                {user?.companyName ?? "N/A"}
              </div>
            </div>
          </div>
          <div className="md:my-10 sm:my-2 md:flex">
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">Mobile Number</span>
              <div className="p-4 bg-gray-100 rounded-md">
                {user?.mobileNumber ?? "N/A"}
              </div>
            </div>
            <div className="mx-2  md:w-[50%] sm:w-full">
              <span className="text-lg">User Type</span>

              <div className="p-4 bg-gray-100 rounded-md">
                {user?.type?.toUpperCase() ?? "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
