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
import { Product } from "../types";
import ProductForm from "./ProductForm";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Style</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Qty On Hand</TableCell>
              <TableCell>Commission %</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.manufacturer}</TableCell>
                <TableCell>{p.style}</TableCell>
                <TableCell>{p.purchasePrice}</TableCell>
                <TableCell>{p.salePrice}</TableCell>
                <TableCell>{p.qtyOnHand}</TableCell>
                <TableCell>{p.commissionPercentage.toFixed(1)}%</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelected(p);
                      setFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        product={selected}
        onSave={fetchProducts}
      />
    </Box>
  );
};

export default ProductList;
