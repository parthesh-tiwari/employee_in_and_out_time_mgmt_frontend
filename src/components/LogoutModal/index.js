import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import { TbLogout2 } from "react-icons/tb";

import { useAuthContext } from "../../contexts/authContext";

const LogoutModal = ({ open, setOpen }) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <div className="text-2xl">
              <TbLogout2 />
            </div>
            Logout from the application ?
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to logout ?</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleLogout();

                setOpen(false);
              }}
            >
              Logout
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default LogoutModal;
