import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/authContext";
import useEmployees from "../../hooks/useEmployee";
import useEmployeeEntries from "../../hooks/useEntries";

import AddEmployeeModal from "../../components/AddEmployeeModal";
import EmployeesTable from "../../components/EmployeesTable";
import { toastSuccess, toastError } from "../../components/Notifications";
import DeleteItemModal from "../../components/DeleteItemModal";
import EntriesTable from "../../components/EntriesTable";
import AddEntryModal from "../../components/AddEntryModal";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { addEmployee, fetchEmployees, deleteEmployee } = useEmployees();
  const { fetchEntriesByEmployee, addEntry } = useEmployeeEntries();

  const [loading, setLoading] = useState();
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [addEntryModalOpen, setAddEntryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModaOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [entries, setEntries] = useState([]);

  const handleAddButtonClick = () => {
    if (user?.type === "admin") {
      setAddEmployeeModalOpen(true);
    } else {
      setAddEntryModalOpen(true);
    }
  };

  const addNewEmployee = (newEmployee) => {
    const existing = [...employees];
    existing.push(newEmployee);
    setEmployees(existing);
  };

  const handleAddEmployee = async (data) => {
    setLoading(true);

    const response = await addEmployee(data);
    if (response) {
      const addedEmployee = {
        ...data,
        _id: response.id,
        createdAt: response.createdAt,
      };
      addNewEmployee(addedEmployee);
      toastSuccess("Employee added successfully");
    } else {
      toastError("Failed to add employee");
    }
    setLoading(false);
  };

  const addNewEntry = (newEntry) => {
    const existing = [...entries];
    existing.push(newEntry);
    setEntries(existing);
  };

  const handleAddEntry = async (data) => {
    setLoading(true);

    const response = await addEntry(data);

    const addedEntry = {
      ...data,
      _id: response.id,
      createdAt: response.createdAt,
    };
    addNewEntry(addedEntry);
    setLoading(false);
  };

  const removeFromEmployees = (employeeId) => {
    const tempEmployees = [...employees];
    const indexToRemove = tempEmployees.findIndex(
      (employee) => employee._id === employeeId
    );
    if (indexToRemove !== -1) {
      tempEmployees.splice(indexToRemove, 1);
      setEmployees(tempEmployees);
    } else {
      console.error(`Employee with _id ${employeeId} not found.`);
    }
  };

  const handleDeleteEmployee = async () => {
    setLoading(true);
    const resposne = await deleteEmployee(selectedEmployee);

    if (resposne) {
      removeFromEmployees(selectedEmployee);
      toastSuccess("Employee deleted successfully");
    } else {
      toastError("Failed to delete employee");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      if (user?.type === "admin" && employees.length > 0) {
        return;
      }

      if (user?.type === "user" && entries.length > 0) {
        return;
      }

      if (user?.type === "admin") {
        const response = await fetchEmployees(user?.companyId);
        if (response) {
          setEmployees(response);
        }
      } else {
        const response = await fetchEntriesByEmployee(user?.id);

        if (response) {
          setEntries(response);
        }
      }
    };
    fetch();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="p-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {user?.type === "admin" ? "Employees" : "My Entries"}
          </h1>
        </div>
        <div>
          <button
            onClick={handleAddButtonClick}
            className="bg-primary hover:bg-primary-accent text-white font-semibold py-2 px-4 rounded"
          >
            {user?.type === "admin" ? "Add Employee" : "Add Entry"}
          </button>
        </div>
      </div>

      <div className="p-10 h-[69vh]">
        {user?.type === "admin" ? (
          <EmployeesTable
            employees={employees}
            openDeleteModal={setDeleteModaOpen}
            setSelectedEmployee={setSelectedEmployee}
          />
        ) : (
          <div>
            <EntriesTable entries={entries} />
          </div>
        )}
      </div>

      <AddEmployeeModal
        addEmployee={handleAddEmployee}
        setOpen={setAddEmployeeModalOpen}
        open={addEmployeeModalOpen}
      />

      <AddEntryModal
        addEntry={handleAddEntry}
        setOpen={setAddEntryModalOpen}
        open={addEntryModalOpen}
      />

      <DeleteItemModal
        handleDelete={handleDeleteEmployee}
        item="Employee"
        open={deleteModalOpen}
        setOpen={setDeleteModaOpen}
      />
    </div>
  );
};

export default Dashboard;
