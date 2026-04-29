import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListEnderecoCliente() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const { state } = useLocation();
    const [idCliente, setIdCliente] = useState();

    

    useEffect(() => {
        console.log("STATE:", state);
        if (state != null && state.idCliente != null) {
            setIdCliente(state.idCliente);
            carregarLista(state.idCliente);
        }
    }, [state]);

    function carregarLista(idClienteParam) {
    axios.get("http://localhost:8080/api/cliente/" + idClienteParam)
        .then((response) => {
            setLista(response.data.enderecos);
        });
}

async function remover() {
    await axios.delete('http://localhost:8080/api/cliente/endereco/' + idRemover)
        .then(() => {
            notifySuccess('Endereço removido com sucesso.');
            carregarLista(idCliente);
        })
        .catch(() => notifyError('Erro ao remover o endereço.'));
    setOpenModal(false);
}

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    return (
        <div>
            <MenuSistema tela={'endereco-cliente'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>

                    <h2>
                        <span style={{ color: 'darkgray' }}>
                            Cliente &nbsp;<Icon name='angle double right' size="small" />
                        </span>
                        Endereços
                    </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>Estado</Table.HeaderCell>
                                    <Table.HeaderCell>Complemento</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map(endereco => (
                                    <Table.Row key={endereco.id}>
                                        <Table.Cell>{endereco.rua}</Table.Cell>
                                        <Table.Cell>{endereco.numero}</Table.Cell>
                                        <Table.Cell>{endereco.bairro}</Table.Cell>
                                        <Table.Cell>{endereco.cep}</Table.Cell>
                                        <Table.Cell>{endereco.cidade}</Table.Cell>
                                        <Table.Cell>{endereco.estado}</Table.Cell>
                                        <Table.Cell>{endereco.complemento}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste endereço'
                                                icon>
                                                <Link
    to="/form-endereco-cliente"
    state={{ id: endereco.id, idCliente: idCliente, endereco: endereco }}
    style={{ color: 'green' }}>
    <Icon name='edit' />
</Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este endereço'
                                                icon
                                                onClick={() => confirmaRemover(endereco.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table>

                        <div style={{ marginTop: '2%' }}>
                            <Link to="/list-cliente">
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
                        </div>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover esse endereço?</div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    );
}