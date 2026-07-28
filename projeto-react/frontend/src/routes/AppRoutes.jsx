import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Reports from "../pages/Reports";
import Login from "../pages/Login";
import Chatbot from "../pages/Chatbot";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Apágina principal do cliente agora é o Chatbot de Atendimento! */}
        <Route path="/" element={<Chatbot />} />

        {/* A tela de login continua em tela cheia */}
        <Route path="/login" element={<Login />} />

        {/* O painel administrativo do gerente fica aqui dentro protegido */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;