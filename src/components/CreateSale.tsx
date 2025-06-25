import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";

interface DropdownItem {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

interface CreateSaleData {
  productId: string;
  customerId: string;
  salesPersonId: string;
  date: string;
}

const CreateSale: React.FC = () => {
  const [products, setProducts] = useState<DropdownItem[]>([]);
  const [customers, setCustomers] = useState<DropdownItem[]>([]);
  const [salespersons, setSalespersons] = useState<DropdownItem[]>([]);
  const [form, setForm] = useState<CreateSaleData>({
    productId: "",
    customerId: "",
    salesPersonId: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
    fetch("/api/customers")
      .then((res) => res.json())
      .then(setCustomers);
    fetch("/api/salespersons")
      .then((res) => res.json())
      .then(setSalespersons);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create sale");
        alert("Sale created successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating sale");
      });
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>
        Create New Sale
      </Typography>
      <Stack spacing={2}>
        <TextField
          select
          label="Product"
          name="productId"
          value={form.productId}
          onChange={handleChange}
          fullWidth
        >
          {products.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Customer"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          fullWidth
        >
          {customers.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.firstName} {c.lastName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Salesperson"
          name="salesPersonId"
          value={form.salesPersonId}
          onChange={handleChange}
          fullWidth
        >
          {salespersons.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Sale Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateSale;
