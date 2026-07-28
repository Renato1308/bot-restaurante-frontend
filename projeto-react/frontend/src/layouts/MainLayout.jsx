import { Outlet } from "react-router-dom";
import Header from "../components/Header";   // Ajuste o caminho da pasta se necessário
import Sidebar from "../components/Sidebar"; // Ajuste o caminho da pasta se necessário

function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 1. O seu Header fica no topo */}
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        {/* 2. A sua Sidebar fica na esquerda */}
        <Sidebar />
        
        {/* 3. O conteúdo das páginas (Dashboard, etc.) renderiza na direita dentro do Outlet */}
        <main style={{ flex: 1, background: "#f3f4f6", padding: "20px" }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}

export default MainLayout;