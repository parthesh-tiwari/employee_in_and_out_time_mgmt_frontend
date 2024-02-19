import React from "react";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { AiOutlineExport } from "react-icons/ai";

import { convertMongoDBDateString } from "../../constants/helperfunctions";

const EmployeesTable = ({
  employees,
  setSelectedEmployee,
  openDeleteModal,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-x-auto rounded-md ">
      {employees && employees.length === 0 ? (
        <div className="text-center">No employeed added yet !</div>
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
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((item) => {
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

                    <td className="px-6 py-4 flex">
                      <span
                        onClick={() => {
                          if (item?._id) {
                            setSelectedEmployee(item?._id);
                            openDeleteModal(true);
                          }
                        }}
                        className="mx-1 text-red-700 hover:text-red-500 cursor-pointer text-3xl"
                      >
                        <MdDelete />
                      </span>
                      <span
                        onClick={() => {
                          if (item?._id) {
                            window.open(
                              `/employee-entries/${item._id}`,
                              "_blank"
                            );
                          }
                        }}
                        className="mx-1 text-primary hover:text-primary-accent cursor-pointer text-3xl"
                      >
                        <AiOutlineExport />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeesTable;
