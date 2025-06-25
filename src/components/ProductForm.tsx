import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Product } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: () => void;
}

const ProductForm: React.FC<Props> = ({ open, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<Product | null>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name.includes("Percentage") ||
        name.includes("Price") ||
        name.includes("qty")
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData) return;

    try {
      const res = await fetch("/api/products");
      const allProducts: Product[] = await res.json();

      const isDuplicate = allProducts.some(
        (p) =>
          p.id !== formData.id &&
          p.name.trim().toLowerCase() === formData.name.trim().toLowerCase() &&
          p.manufacturer.trim().toLowerCase() ===
            formData.manufacturer.trim().toLowerCase()
      );

      if (isDuplicate) {
        alert("A product with this name and manufacturer already exists.");
        return;
      }

      const updateRes = await fetch(`/api/products/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!updateRes.ok) throw new Error("Update failed");
      onSave();
      onClose();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed");
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />
          <TextField
            label="Style"
            name="style"
            value={formData.style}
            onChange={handleChange}
          />
          <TextField
            label="Purchase Price"
            name="purchasePrice"
            type="number"
            value={formData.purchasePrice}
            onChange={handleChange}
          />
          <TextField
            label="Sale Price"
            name="salePrice"
            type="number"
            value={formData.salePrice}
            onChange={handleChange}
          />
          <TextField
            label="Qty On Hand"
            name="qtyOnHand"
            type="number"
            value={formData.qtyOnHand}
            onChange={handleChange}
          />
          <TextField
            label="Commission %"
            name="commissionPercentage"
            type="number"
            value={formData.commissionPercentage}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
