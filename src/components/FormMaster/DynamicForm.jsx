import { IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";

const DynamicForm = ({name}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen =()=> {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
      };
    return(
        <>
        <IconButton onClick={handleClickOpen}>
            <VisibilityIcon/>
        </IconButton>

        <Dialog
        maxWidth="lg" fullWidth
        open={open}
        onClose={handleClose}>
             <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize:'22px'}}>form name</DialogTitle>
        </Dialog>

        </>
    )
}

export default DynamicForm;
