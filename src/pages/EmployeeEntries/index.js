import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { useNavigate, useParams } from "react-router-dom";
import useEmployeeEntries from "../../hooks/useEntries";

import { toastError, toastSuccess } from "../../components/Notifications";
import EntriesTable from "../../components/EntriesTable";

const EmployeeEntries = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { fetchEntriesByEmployee } = useEmployeeEntries();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (entries.length > 0) {
      return;
    }
    const fetch = async () => {
      const response = await fetchEntriesByEmployee(id);
      if (response) {
        setEntries(response);
      } else {
        toastError("Failed to fetch entries");
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return user?.type === "admin" ? (
    loading ? (
      <>Loading...</>
    ) : (
      <div className="p-10">
        <div className="justify-between">
          <div>
            <h1 className="text-3xl font-bold">In and Out Entries</h1>
          </div>
          <div className="py-10">
            <EntriesTable entries={entries} />
          </div>
        </div>
      </div>
    )
  ) : (
    <p className="text-center">You are not authorized to access the page</p>
  );
};

export default EmployeeEntries;
