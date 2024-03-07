import { Icon } from "@iconify/react";
import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import OutlinedBtn from "../buttons/OutlinedBtn";
import FilledBtn from "../buttons/FilledBtn";

const SimpleDialog = (props) => {
  const { onClose, delData } = props;

  const handleClose = () => {
    onClose();
  };

  const ClickDel = () => {
    onClose(delData?.id);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: 15,
        },
      }}
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={delData?.open}
    >
      <DialogContent>
        <div className="flex flex-col items-center">
          <Icon
            className="size-[80px] text-red-500 border-2 border-red-500 rounded-full p-3 bg-red-100"
            icon="typcn:warning"
          />
          <h2 className="text-center font-bold text-xl mb-1 mt-3">Are You Sure ??</h2>
          <p className="text-sm opacity-70 text-center">
            This action cannot be undone. All values associated with
            <span className="font-bold text-red-500"> {delData?.name}</span> field will be lost.
          </p>
        </div>
        <div className="flex gap-4 mt-5">
          <OutlinedBtn onClick={handleClose} icon={"ion:close-outline"} border="gray" extra="w-1/2" text="Cancel" />
          <FilledBtn onClick={ClickDel} icon={"fluent:delete-16-regular"} bg="red" extra="w-1/2" text="yes, Delete" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleDialog;
