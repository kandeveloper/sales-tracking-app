import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import { Customer } from "../types";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/customers")
      // fetch("http://localhost:4000/customers") // using mock data
      .then((res) => res.json())
      .then((data: Customer[]) => setCustomers(data))
      .catch((err) => console.error("Failed to fetch customers:", err));
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Customers
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell>{cust.firstName}</TableCell>
                <TableCell>{cust.lastName}</TableCell>
                <TableCell>{cust.phone}</TableCell>
                <TableCell>{cust.address}</TableCell>
                <TableCell>
                  {dayjs(cust.startDate).format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;
