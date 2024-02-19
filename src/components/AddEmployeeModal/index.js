import { useState } from "react";

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";

import { toastError } from "../Notifications";

import { IoPersonAddSharp } from "react-icons/io5";

import { useAuthContext } from "../../contexts/authContext";

const AddEmployeeModal = ({ open, setOpen, addEmployee }) => {
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleAddEmployee = () => {
    if (
      name.length === 0 ||
      username.length === 0 ||
      emailAddress.length === 0 ||
      mobileNumber.length === 0
    ) {
      return toastError("please fill the complete form");
    }

    const data = {
      name,
      username,
      emailAddress,
      mobileNumber,
      password: username,
      companyId: user?.companyId ?? "",
      companyName: user?.companyName ?? "",
    };
    addEmployee(data);
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <div className="text-2xl">
              <IoPersonAddSharp />
            </div>
            Add New Employee
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className="md:w-[520px]">
              <div className="flex mb-4">
                <div className="m-2 mx-1 w-1/2">
                  <label htmlFor="username">Full Name</label>
                  <Input
                    placeholder="Enter employee name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="m-2 mx-1 w-1/2">
                  <label htmlFor="username">Username</label>
                  <Input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mt-4">
                <div className="m-2 mx-1 w-1/2">
                  <label htmlFor="username">Email Address</label>
                  <Input
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>
                <div className="m-2 mx-1 w-1/2">
                  <label htmlFor="username">Mobile Number</label>
                  <Input
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              </div>
              <small>* Username will be the default password</small>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleAddEmployee}>
              Add
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
