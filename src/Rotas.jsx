import { Route, Routes } from "react-router-dom";

import FormCliente from "./views/cliente/FormCliente";
import FormEnderecoCliente from "./views/cliente/FormEnderecoCliente";
import ListCliente from "./views/cliente/ListCliente";
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/Home";
import FormCategoriaProduto from "./views/produto/FormCategoriaProduto";
import FormProduto from "./views/produto/FormProduto";
import ListCategoriaProduto from "./views/produto/ListCategoriaProduto";
import ListProduto from "./views/produto/ListProduto";
import ListEnderecoCliente from "./views/cliente/ListEnderecoCliente";
import FormLogin from './views/login/FormLogin';
import { ProtectedRoute } from './views/util/ProtectedRoute';


function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FormLogin/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-cliente" element={<ProtectedRoute><ListCliente /></ProtectedRoute>} />
        <Route path="form-produto" element={<ProtectedRoute><FormProduto /></ProtectedRoute>} />
        <Route path="list-produto" element={<ProtectedRoute><ListProduto /></ProtectedRoute>}></Route>
        <Route path="form-entregador" element={<ProtectedRoute><FormEntregador /></ProtectedRoute>} />
        <Route path="list-entregador" element={<ProtectedRoute><ListEntregador /></ProtectedRoute>}></Route>
        <Route path="list-categoria" element={<ProtectedRoute><ListCategoriaProduto /></ProtectedRoute>}></Route>
        <Route path="form-categoria" element={<ProtectedRoute><FormCategoriaProduto /></ProtectedRoute>} />
        <Route path="form-endereco-cliente" element={<ProtectedRoute><FormEnderecoCliente /></ProtectedRoute>} />
        <Route path="list-endereco-cliente" element={<ProtectedRoute><ListEnderecoCliente /></ProtectedRoute>}></Route>
      </Routes>
    </>
  );
}

export default Rotas;
