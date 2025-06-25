import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { SalesPerson } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  salesperson: SalesPerson | null;
  onSave: () => void;
}

const SalespersonForm: React.FC<Props> = ({
  open,
  onClose,
  salesperson,
  onSave,
}) => {
  const [formData, setFormData] = useState<SalesPerson | null>(salesperson);

  React.useEffect(() => {
    setFormData(salesperson);
  }, [salesperson]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      // Fetch all existing salespersons
      const res = await fetch("/api/salespersons");
      const existing: SalesPerson[] = await res.json();

      // Check for duplicate name (ignore same id)
      const isDuplicate = existing.some(
        (sp) =>
          sp.id !== formData.id &&
          sp.firstName.trim().toLowerCase() ===
            formData.firstName.trim().toLowerCase() &&
          sp.lastName.trim().toLowerCase() ===
            formData.lastName.trim().toLowerCase()
      );

      if (isDuplicate) {
        alert("A salesperson with this first and last name already exists.");
        return;
      }

      // Proceed to update
      const updateRes = await fetch(`/api/salespersons/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!updateRes.ok) throw new Error("Update failed");
      onSave();
      onClose();
    } catch (err) {
      console.error("Error during update:", err);
      alert("Update failed");
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Salesperson</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="Manager"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          />
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Termination Date"
            type="date"
            name="terminationDate"
            value={formData.terminationDate?.slice(0, 10) || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalespersonForm;
