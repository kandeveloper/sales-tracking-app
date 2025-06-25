import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import SalespersonList from "./components/SalesPersonList";
import CommissionReport from "./components/CommissionReport";
import SalesList from "./components/SalesList";
import CreateSale from "./components/CreateSale";

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
