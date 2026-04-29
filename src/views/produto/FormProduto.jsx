import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../../views/util/Util";
export default function FormProduto() {
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();
  const [idProduto, setIdProduto] = useState();

  const { state } = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categoriaproduto")
      .then((response) => {
        let options = response.data.map((cat) => ({
          key: cat.id,
          text: cat.descricao,
          value: cat.id,
        }));
        setListaCategoria(options);

        if (state != null && state.id != null) {
          axios
            .get("http://localhost:8080/api/produto/" + state.id)
            .then((response) => {
              setIdProduto(response.data.id);
              setIdCategoria(response.data.categoria != null ? response.data.categoria.id : null)
              setCodigo(response.data.codigo);
              setTitulo(response.data.titulo);
              setDescricao(response.data.descricao);
              setValorUnitario(response.data.valorUnitario);
              setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
              setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
            });
        }
      })
      .catch((error) => {
        notifyError("Erro ao carregar categorias:", error);
      });
  }, [state]);

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          notifySuccess("Produto alterado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao alterar um produto.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          notifySuccess("Produto cadastrado com sucesso.");
        })
        .catch((error) => {
          notifyError("Erro ao incluir o produto.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"form-produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  placeholder="Informe o título do produto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                ></Form.Input>
                <Form.Input
                  required
                  fluid
                  label="Código do Produto"
                  maxLength="100"
                  placeholder="Informe o Código do produto"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Select
                required
                fluid
                tabIndex="3"
                placeholder="Selecione"
                label="Categoria"
                options={listaCategoria}
                value={idCategoria}
                onChange={(e, { value }) => setIdCategoria(value)}
              />

              <Form.TextArea
                fluid
                label="Descrição"
                placeholder="Informe a descrição do produto"
                maxLength="200"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></Form.TextArea>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Valor unitário"
                  maxLength="100"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  placeholder="30"
                  maxLength="100"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  placeholder="40"
                  maxLength="100"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                ></Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-produto"}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
