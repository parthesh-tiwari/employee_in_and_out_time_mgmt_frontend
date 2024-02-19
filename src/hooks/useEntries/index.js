import api from "../../constants/api";

const useEmployeeEntries = () => {
  const addEntry = async (data) => {
    const payload = JSON.stringify(data);

    try {
      const response = await api.post("/api/employee-entry", payload);

      if (response?.data) {
        const responseData = response.data;
        return responseData?.entry;
      }

      return false;
    } catch (error) {
      console.log("Error occurred at useEmployeeEntries addEntry", error);
      return false;
    }
  };

  const fetchEntriesByEmployee = async (employeeId) => {
    try {
      const response = await api.get(`/api/employee-entry/${employeeId}`);

      if (response?.data) {
        const responseData = response?.data;
        if (responseData?.status === "success") {
          return responseData?.entries;
        }
      }
      return false;
    } catch (error) {
      console.log(
        "Error from useEmployeeEntries fetchEntriesByEmployee",
        error
      );
      return false;
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await api.delete(`/api/employee-entry/${id}`);

      if (response?.data) {
        const responseData = response.data;
        if (responseData?.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useEmployeeEntries deleteEntry", error);
      return false;
    }
  };

  return { addEntry, fetchEntriesByEmployee, deleteEntry };
};

export default useEmployeeEntries;
