import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, TableHeaderCell } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [idDetalhe, setIdDetalhe] = useState();


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                notifySuccess('Entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                notifyError('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }


    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function modalLista(id){
        axios.get("http://localhost:8080/api/entregador/" + id)
            .then((response) => {
                setIdDetalhe(response.data);
                setOpenModal2(true)
            })
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Quantidade de Entregas Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell>UF</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.ativo}</Table.Cell>
                                        <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Icon name='edit' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='orange'
                                                icon
                                                onClick={e => modalLista(entregador.id)}>
                                                <Icon name='plus' />
                                                    

                                            </Button>
                                            
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            {/*Primeiro Modal - Remover Registro*/}
            <Modal
                id='mais'
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
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

            {/*Segundo Modal - Tabela Entregador*/}
            <Modal
                basic
                centered={true}
                size='fullscreen'
                onClose={() => setOpenModal2(false)}
                onOpen={() => setOpenModal2(true)}
                open={openModal2}
            >
                <Modal.Content>
                    {idDetalhe && (
                        <Table color='orange' celled>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nome</Table.HeaderCell>
                            <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                            <Table.HeaderCell>CPF</Table.HeaderCell>
                            <Table.HeaderCell>RG</Table.HeaderCell>
                            <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                            <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                            <Table.HeaderCell>Quantidade de Entregas Realizadas</Table.HeaderCell>
                            <Table.HeaderCell>Valor do Frete</Table.HeaderCell>
                            <Table.HeaderCell>Rua</Table.HeaderCell>
                            <Table.HeaderCell>Complemento</Table.HeaderCell>
                            <Table.HeaderCell>Número</Table.HeaderCell>
                            <Table.HeaderCell>Bairro</Table.HeaderCell>
                            <Table.HeaderCell>Cidade</Table.HeaderCell>
                            <Table.HeaderCell>CEP</Table.HeaderCell>
                            <Table.HeaderCell>UF</Table.HeaderCell>
                            <Table.HeaderCell>Ativo</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                            <Table.Row key={idDetalhe.id}>
                                <Table.Cell>{idDetalhe.nome}</Table.Cell>
                                <Table.Cell>{idDetalhe.dataNascimento}</Table.Cell>
                                <Table.Cell>{idDetalhe.cpf}</Table.Cell>
                                <Table.Cell>{idDetalhe.rg}</Table.Cell>
                                <Table.Cell>{idDetalhe.foneCelular}</Table.Cell>
                                <Table.Cell>{idDetalhe.foneFixo}</Table.Cell>
                                <Table.Cell>{idDetalhe.qtdEntregasRealizadas}</Table.Cell>
                                <Table.Cell>{idDetalhe.valorFrete}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoRua}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoComplemento}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoNumero}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoBairro}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoCidade}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoCep}</Table.Cell>
                                <Table.Cell>{idDetalhe.enderecoUf}</Table.Cell>
                                <Table.Cell>{idDetalhe.ativo}</Table.Cell>


                            </Table.Row>
                       

                    </Table.Body>
                </Table>
                    )}
                </Modal.Content>
                

                <Modal.Actions>
                    <Button onClick={() => setOpenModal2(false)}>
                        <Icon name='angle left'></Icon>
                        Sair</Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
