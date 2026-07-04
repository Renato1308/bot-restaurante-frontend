import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;