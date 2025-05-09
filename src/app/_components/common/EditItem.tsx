"use client";

import Item from "@/app/admin/items/ItemModel";
import { Edit } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import EditItemForm from "../forms/EditItemForm";

type Props = {
  item: Item;
};

function EditItem({ item }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button startIcon={<Edit />} onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <EditItemForm onCloseForm={() => setIsOpen(false)} item={item} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditItem;
