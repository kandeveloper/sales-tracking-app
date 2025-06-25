import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight={600}>
        BeSpoked Bikes Dashboard
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Choose an option to continue
      </Typography>

      <Stack spacing={2} width="100%" maxWidth="300px">
        <Button component={Link} to="/products" variant="contained" fullWidth>
          Product List
        </Button>
        <Button component={Link} to="/customers" variant="contained" fullWidth>
          Customer List
        </Button>
        <Button
          component={Link}
          to="/salespersons"
          variant="contained"
          fullWidth
        >
          Salesperson List
        </Button>
        <Button component={Link} to="/createsale" variant="contained" fullWidth>
          Create Sale
        </Button>
        <Button component={Link} to="/sales" variant="contained" fullWidth>
          Sales List
        </Button>
        <Button
          component={Link}
          to="/commissions"
          variant="contained"
          color="success"
          fullWidth
        >
          Commission Report
        </Button>
      </Stack>
    </Box>
  );
};

export default LandingPage;
