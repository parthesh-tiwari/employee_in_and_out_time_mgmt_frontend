import { useState } from "react";

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import { GiEntryDoor } from "react-icons/gi";

import { toastError } from "../Notifications";
import { useAuthContext } from "../../contexts/authContext";

const AddEntryModal = ({ open, setOpen, addEntry }) => {
  const { user } = useAuthContext();

  const [type, setType] = useState("");

  const handleAddEntry = () => {
    if (type === "") {
      return toastError("please select the entry type");
    }
    const data = {
      type,
      employeeId: user?.id,
      emailAddress: user?.emailAddress,
      mobileNumber: user?.mobileNumber,
      name: user?.name,
    };
    addEntry(data);
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <div className="text-2xl">
              <GiEntryDoor />
            </div>
            Add In and Out Entry
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div>
              <div className="m-2 mx-1">
                <Select
                  onChange={(e, newValue) => {
                    setType(newValue);
                  }}
                  placeholder="Choose Entry"
                  className="my-3 text-[16px]"
                >
                  <Option value="Entry">Entry</Option>
                  <Option value="Exit">Exit</Option>
                </Select>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleAddEntry}>
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

export default AddEntryModal;
