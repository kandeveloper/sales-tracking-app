import React, { useCallback, useEffect, useState } from "react";
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
  TextField,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Sale } from "../types";

const SalesList: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const fetchSales = useCallback(() => {
    let url = "/api/sales";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sales");
        return res.json();
      })
      .then((data: Sale[]) => {
        const filtered = data.filter((sale) => {
          const saleDate = dayjs(sale.date);
          const afterStart = startDate
            ? saleDate.isSameOrAfter(dayjs(startDate))
            : true;
          const beforeEnd = endDate
            ? saleDate.isSameOrBefore(dayjs(endDate))
            : true;
          return afterStart && beforeEnd;
        });
        setSales(filtered);
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
      });
  }, [startDate, endDate]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Sales Report
      </Typography>

      <Box mb={2} display="flex" gap={2}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={fetchSales}>
          Filter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Salesperson</TableCell>
              <TableCell>Commission ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{dayjs(sale.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{sale.product.name}</TableCell>
                  <TableCell>
                    {sale.customer.firstName} {sale.customer.lastName}
                  </TableCell>
                  <TableCell>{sale.product.salePrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {sale.salesPerson.firstName} {sale.salesPerson.lastName}
                  </TableCell>
                  <TableCell>
                    {(
                      sale.product.salePrice *
                      (sale.product.commissionPercentage / 100)
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No sales found for the selected range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesList;
