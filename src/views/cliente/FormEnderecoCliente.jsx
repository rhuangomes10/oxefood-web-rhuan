import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormEnderecoCliente() {
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [complemento, setComplemento] = useState();
   const [estados, setEstados] = useState([]);

  const { state } = useLocation();
  const [idEndereco, setIdEndereco] = useState();
  const [idCliente, setIdCliente] = useState();

  useEffect(() => {
     axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((response) => {
        setEstados(response.data);
    if (state != null && state.idCliente != null) {
        setIdCliente(state.idCliente);
    }

    if (state != null && state.endereco != null) {
        const e = state.endereco;
        setIdEndereco(e.id);
        setRua(e.rua);
        setNumero(e.numero);
        setBairro(e.bairro);
        setCep(e.cep);
        setCidade(e.cidade);
        setEstado(e.estado);
        setComplemento(e.complemento);
    }
     })
      .catch((error) => {
        notifyError("Erro ao acessar estados.");
      });
}, [state]);

const estadosOptions = estados.map((estado) => ({
    key: estado.id,
    value: estado.sigla,
    text: estado.nome,
  }));

function salvar() {
    let enderecoRequest = { rua, numero, bairro, cep, cidade, estado, complemento };

    const clienteId = idCliente || state?.idCliente; // ✅ garante o valor

    if (idEndereco != null) {
        axios.put("http://localhost:8080/api/cliente/endereco/" + idEndereco, enderecoRequest)
            .then(() => notifySuccess('Endereço alterado com sucesso.'))
            .catch(() => notifyError('Erro ao alterar o endereço.'));
    } else {
        axios.post("http://localhost:8080/api/cliente/endereco/" + clienteId, enderecoRequest)
            .then(() => notifySuccess('Endereço cadastrado com sucesso.'))
            .catch(() => notifyError('Erro ao incluir o endereço.'));
    }
}

  return (
    <div>
      <MenuSistema tela={"form-endereco-cliente"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">

          {idEndereco === undefined &&
            <h2><span style={{ color: 'darkgray' }}>Endereço Cliente &nbsp;<Icon name='angle double right' size="small" /></span> Cadastro</h2>
          }
          {idEndereco != undefined &&
            <h2><span style={{ color: 'darkgray' }}>Endereço Cliente &nbsp;<Icon name='angle double right' size="small" /></span> Alteração</h2>
          }

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Rua"
                  maxLength="200"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Número"
                  maxLength="10"
                  width={4}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Bairro"
                  maxLength="100"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />

                <Form.Input fluid label="CEP" width={6}>
                  <InputMask
                    mask="99999-999"
                    placeholder="Ex: 50000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Cidade"
                  maxLength="100"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />

                <Form.Select
                fluid
                label="Estado"
                placeholder="Selecione"
                options={estadosOptions}
                value={estado}
                onChange={(e, { value }) => setEstado(value)}
              ></Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Complemento"
                  maxLength="200"
                  width={16}
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-cliente"} state={{ idCliente: idCliente }}>
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