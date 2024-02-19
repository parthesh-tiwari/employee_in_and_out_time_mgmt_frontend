import React from "react";

import { convertMongoDBDateString } from "../../constants/helperfunctions";

const EntriesTable = ({ entries }) => {
  return (
    <div className="relative overflow-x-auto rounded-md ">
      {entries && entries.length === 0 ? (
        <div className="text-center">No in and out entries added yet !</div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-md text-white uppercase bg-primary font-semibold">
            <tr>
              <td scope="col" className="px-6 py-3">
                Full Name
              </td>
              <td scope="col" className="px-6 py-3">
                Email Address
              </td>
              <td scope="col" className="px-6 py-3">
                Mobile Number
              </td>
              <td scope="col" className="px-6 py-3">
                Added At
              </td>
              <td scope="col" className="px-6 py-3">
                Type
              </td>
            </tr>
          </thead>
          <tbody>
            {entries &&
              entries.map((item) => {
                return (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item?.name ?? ""}
                    </th>
                    <td className="px-6 py-4">{item?.emailAddress ?? ""}</td>
                    <td className="px-6 py-4">{item?.mobileNumber ?? ""}</td>

                    <td className="px-6 py-4">
                      {item?.createdAt
                        ? convertMongoDBDateString(item?.createdAt)
                        : ""}
                    </td>

                    <td className="px-6 py-4 flex">{item?.type ?? "N/A"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EntriesTable;
