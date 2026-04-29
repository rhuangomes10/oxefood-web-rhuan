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

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-cliente" element={<ListCliente />} />
        <Route path="form-produto" element={<FormProduto />} />
        <Route path="list-produto" element={<ListProduto />}></Route>
        <Route path="form-entregador" element={<FormEntregador />} />
        <Route path="list-entregador" element={<ListEntregador />}></Route>
        <Route path="list-categoria" element={<ListCategoriaProduto />}></Route>
        <Route path="form-categoria" element={<FormCategoriaProduto />} />
        <Route path="form-endereco-cliente" element={<FormEnderecoCliente />} />
        <Route path="list-endereco-cliente" element={<ListEnderecoCliente />} />
      </Routes>
    </>
  );
}

export default Rotas;
