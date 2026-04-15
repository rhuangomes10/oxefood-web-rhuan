import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListCliente from './views/cliente/ListCliente';
import ListProduto from './views/produto/ListProduto';
import ListEntregador from './views/entregador/ListEntregador';
import ListCategoriaProduto from './views/produto/ListCategoriaProduto';
import FormCategoriaProduto from './views/produto/FormCategoriaProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path='list-produto' element={ <ListProduto/>}></Route>
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path='list-entregador' element={<ListEntregador/>}></Route>
                <Route path='list-categoria' element={<ListCategoriaProduto/>}></Route>
                <Route path="form-categoria" element={ <FormCategoriaProduto/> } />
            </Routes>
        </>
    )
}

export default Rotas
