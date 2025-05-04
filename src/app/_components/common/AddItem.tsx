"use client";

import { Add } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import AddItemForm from "../forms/AddItemForm";

function AddItem() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button startIcon={<Add />} onClick={() => setIsOpen(true)}>
        Add Item
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <AddItemForm onCloseForm={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddItem;
