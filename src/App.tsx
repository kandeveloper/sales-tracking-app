import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import SalespersonList from "./components/SalesPersonList";
import CommissionReport from "./components/CommissionReport";
import SalesList from "./components/SalesList";
import CreateSale from "./components/CreateSale";

//   <Container maxWidth="sm" sx={{ mt: 5 }}>
//     <Typography variant="h4" gutterBottom>
//       BeSpoked Bikes - Dashboard
//     </Typography>
//     <List>
//       <ListItem disablePadding>
//         <ListItemButton component={Link} to="/products">
//           <ListItemText primary="Product List" />
//         </ListItemButton>
//       </ListItem>
//       <ListItem disablePadding>
//         <ListItemButton component={Link} to="/customers">
//           <ListItemText primary="Customer List" />
//         </ListItemButton>
//       </ListItem>
//       <ListItem disablePadding>
//         <ListItemButton component={Link} to="/salespersons">
//           <ListItemText primary="Salesperson List" />
//         </ListItemButton>
//       </ListItem>
//       <ListItem disablePadding>
//         <ListItemButton component={Link} to="/commissions">
//           <ListItemText primary="Quarterly Commission Report" />
//         </ListItemButton>
//       </ListItem>
//       <ListItem disablePadding>
//         <ListItemButton component={Link} to="/sales">
//           <ListItemText primary="Sales List" />
//         </ListItemButton>
//       </ListItem>
//     </List>
//   </Container>
// );

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/salespersons" element={<SalespersonList />} />
        <Route path="/commissions" element={<CommissionReport />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/createsale" element={<CreateSale />} />
      </Routes>
    </Router>
  );
};

export default App;
