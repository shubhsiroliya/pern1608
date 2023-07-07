import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Master from "./components/Master";
import Table from "./components/Table";
import Analyse from "./components/Analyse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/master" Component={Master} />
        <Route path="/table/:id" Component={Table} />
        <Route path="/analyzetable/:id" Component={Analyse} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
