import api from "../../constants/api";

const useEmployees = () => {
  const addEmployee = async (data) => {
    const payload = JSON.stringify(data);

    try {
      const response = await api.post("/api/employees", payload);

      if (response?.data) {
        const responseData = response.data;
        return responseData?.employee;
      }
      return false;
    } catch (error) {
      console.log("Error occured at useEmployees addEmployee", error);
      return false;
    }
  };

  const fetchEmployees = async (companyId) => {
    try {
      const response = await api.get(`/api/employees/${companyId}`);

      if (response?.data) {
        const responseData = response?.data;
        if (responseData?.status === "success") {
          return responseData?.employees;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useEm useEmployee's fetchEmployees", error);
      return false;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await api.delete(`/api/employees/${id}`);

      if (response?.data) {
        const responseData = response.data;
        if (responseData?.status === "success") {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error from useEmployee's' deleteEmployee", error);
      return false;
    }
  };

  return { addEmployee, fetchEmployees, deleteEmployee };
};

export default useEmployees;
