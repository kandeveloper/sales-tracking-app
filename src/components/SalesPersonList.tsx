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
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { SalesPerson } from "../types";
import SalespersonForm from "./SalespersonForm";

const SalespersonList: React.FC = () => {
  const [salespersons, setSalespersons] = useState<SalesPerson[]>([]);
  const [selected, setSelected] = useState<SalesPerson | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchSalespersons = () => {
    fetch("/api/salespersons")
      // fetch("http://localhost:4000/salespersons") // using mock data
      .then((res) => res.json())
      .then((data: SalesPerson[]) => setSalespersons(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSalespersons();
  }, []);

  const handleEditClick = (sp: SalesPerson) => {
    setSelected(sp);
    setFormOpen(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Salespersons
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Terminate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salespersons.map((sp) => (
              <TableRow key={sp.id}>
                <TableCell>{sp.firstName}</TableCell>
                <TableCell>{sp.lastName}</TableCell>
                <TableCell>{sp.phone}</TableCell>
                <TableCell>{sp.manager}</TableCell>
                <TableCell>
                  {dayjs(sp.startDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {sp.terminationDate
                    ? dayjs(sp.terminationDate).format("YYYY-MM-DD")
                    : "—"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(sp)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SalespersonForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        salesperson={selected}
        onSave={fetchSalespersons}
      />
    </Box>
  );
};

export default SalespersonList;
