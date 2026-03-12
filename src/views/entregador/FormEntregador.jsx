import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useState, useEffect } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { Link } from "react-router-dom";

export default function FormEntregador() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [ativo, setAtivo] = useState();
  const [rg, setRg] = useState();

  const [estados, setEstados] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
      )
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao acessar estados.");
      });
  }, []);

  const estadosOptions = estados.map((estado) => ({
    key: estado.id,
    value: estado.sigla,
    text: estado.nome,
  }));

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo,
      rg: rg,
    };

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o um entregador.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"form-entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            Cadastro
          </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  required
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                ></Form.Input>

                <Form.Input required fluid label="CPF" maxLength="100">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="RG"
                  maxLength="50"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                ></Form.Input>
              </Form.Group>
              <Form.Group>
                <Form.Input fluid label="Data Nascimento" width={3}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid required label="Fone Celular" width={4}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={4}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="QTD Entregas Realizadas"
                  width={3}
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Valor por Frete"
                  width={3}
                  value={valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  fluid
                  label="Rua"
                  width={13}
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Número"
                  width={3}
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Bairro"
                  width={6}
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="Cidade"
                  width={6}
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                ></Form.Input>
                <Form.Input
                  fluid
                  label="CEP"
                  width={1}
                  value={enderecoCep}
                  onChange={(e) => setEnderecoCep(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Select
                fluid
                label="UF"
                placeholder="Selecione"
                options={estadosOptions}
                value={enderecoUf}
                onChange={(e, { value }) => setEnderecoUf(value)}
              ></Form.Select>
              <Form.Input
                fluid
                label="Complemento"
                value={enderecoComplemento}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              ></Form.Input>
              <Form.Group>
                <label htmlFor="Form.Radio">Ativo:</label>
                <Form.Radio
                  fluid
                  label="Sim"
                  checked={ativo === true}
                  value={ativo}
                  onChange={() => setAtivo(true)}
                ></Form.Radio>
                <Form.Radio
                  fluid
                  label="Não"
                  checked={ativo === false}
                  value={ativo}
                  onChange={() => setAtivo(false)}
                ></Form.Radio>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-entregador"}>
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
