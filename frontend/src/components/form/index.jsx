import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom"
import {
    Input,
    Row,
    Col,
    Typography,
    Select,
    Modal,
    Button,
    List,
    message
} from 'antd'
import { Form, Icon } from '@ant-design/compatible'

import api from '../../service/api'
import { maskPhone, maskZipCode, validateCpfORCnpj } from '../../utils/util'

const { Option } = Select
const { Text } = Typography

const FormComponent = (props) => {

    const history = useHistory()
    const { form } = props
    const { getFieldDecorator } = form

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [state, setState] = useState({})
    const [phones, setPhones] = useState([])
    const [newphones, setNewPhones] = useState("")

    const user = useLocation();

    useEffect(() => {
        if (user && user.state) {
            setState(user.state)
            setPhones(user.state.telefones)
        }
    }, [user])

    const showModal = () => {
        setIsModalVisible(true);
    }
    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handlerSubmitForm = e => {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const QUERY = {
                    nomeCliente: values.nomeCliente,
                    razaoSocial: values.razaoSocial,
                    CEP: values.CEP,
                    email: values.email,
                    classificacao: values.classificacao,
                    cpfCnpj: values.cpfCnpj,
                    tipoCliente: values.tipoCliente,
                    telefones: values.telefones.toString(),
                }
                if (user.state) {
                    updateData(QUERY)
                } else {
                    createNewData(QUERY)
                }
            } else {
                console.log("Error..")
            }
        })
    }

    const createNewData = async QUERY => {
        const res = await api.post('customers', QUERY)
        if (res.status === 201 && res.data.status === 1) {
            message.success(res.data.message)
            history.push('/')
        } else {
            message.error(res.data.message)
        }
    }

    const updateData = async QUERY => {
        const res = await api.put(`customers/${state.idCliente}`, QUERY)
        if (res.status === 200) {
            message.success(res.data.message)
            history.push('/')
        } else {
            message.error(res.data.message)
        }
    }

    return (
        <Form onSubmit={handlerSubmitForm} colon={false}>
            <Row gutter={24} className="row-form">
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>Nome: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('nomeCliente', {
                                        rules: [
                                            {
                                                require: true,
                                                message: 'Nome do cliente é obrigatório!'
                                            }
                                        ],
                                        initialValue: state ? state.nomeCliente : null
                                    })(
                                        <Input
                                            required
                                            placeholder="Digite o nome do cliente..."
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>Razão social: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('razaoSocial', {
                                        initialValue: user !== null ? state.razaoSocial : null
                                    })(
                                        <Input
                                            placeholder="Digite a razão social da empresa..."
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={24} className="row-form">
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>CPF/CNPJ: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('cpfCnpj', {
                                        getValueFromEvent: e => validateCpfORCnpj(e.target.value.toString()),
                                        initialValue: user !== null ? state.cpfCnpj : null
                                    })(
                                        <Input
                                            maxLength={18}
                                            placeholder="Digite o CPF/CNPJ do cliente..."
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>E-mail: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'O email digitado é invalido!'
                                            },
                                            {
                                                require: true,
                                                message: 'E-mail é obrigatória!'
                                            }
                                        ],
                                        initialValue: user !== null ? state.email : null
                                    })(
                                        <Input
                                            required
                                            placeholder="Digite o email do cliente..."
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={24} className="row-form">
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>CEP: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('CEP', {
                                        getValueFromEvent: e => maskZipCode(e.target.value.toString()),
                                        initialValue: user !== null ? state.CEP : null
                                    })(
                                        <Input
                                            maxLength={10}
                                            placeholder="Digite o CEP do cliente..."
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>Classificação: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('classificacao', {
                                        rules: [
                                            {
                                                require: true,
                                                message: 'Classificação é obrigatória!'
                                            }
                                        ],
                                        initialValue: user !== null ? state.classificacao : null
                                    })(
                                        <Select placeholder="Escolha a classificação.">
                                            <Option value="Ativo">Ativo</Option>
                                            <Option value="Inativo">Inativo</Option>
                                            <Option value="Preferencial">Preferencial</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={24} className="row-form">
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>Telefone: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                <div className="div-telefone">
                                    {
                                        getFieldDecorator('telefones', {
                                            rules: [
                                                {
                                                    require: true,
                                                    message: 'Telefones do cliente é obrigatório!'
                                                }
                                            ],
                                            initialValue: phones.toString()
                                        })(
                                            <Input
                                                required
                                                disabled
                                                placeholder="Adicionar telefone do cliente..."
                                            />
                                        )
                                    }
                                    <Button type="dashed" onClick={showModal} >
                                        <Icon type="plus" />
                                    </Button>
                                    <Button type="dashed" onClick={() => setPhones([])} >
                                        <Icon type="close" />
                                    </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={24}>
                        <Col className="label-form">
                            <Text>Tipo Cliente: </Text>
                        </Col>
                        <Col className="col-input-form">
                            <Form.Item>
                                {
                                    getFieldDecorator('tipoCliente', {
                                        initialValue: user !== null ? state.tipoCliente : null
                                    })(
                                        <Select placeholder="Escolha o tipo do cliente.">
                                            <Option value="PJ">PJ</Option>
                                            <Option value="PF">PF</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Form.Item>
                <Button htmlType="submit">
                    Salvar
                </Button>
            </Form.Item>
            <Modal
                title="Telefones"
                visible={isModalVisible}
                onOk={handleOk}
                cancelText={"false"}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={phones}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button type="text" onClick={() => setPhones(phones.filter(f => f !== item))} >
                                    <Icon type="close" />
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={item}
                            />
                        </List.Item>
                    )}
                />
                <Row gutter={24}>
                    <Col span={18}>
                        <Input
                            maxLength={15}
                            value={newphones}
                            onChange={e => setNewPhones(maskPhone(e.target.value))}
                            placeholder="Digite o telefone..."
                        />
                    </Col>
                    <Col span={6}>
                        <Button type="dashed" onClick={() => {
                            setPhones(phones.concat(newphones))
                            setNewPhones("")
                        }} >
                            Adicionar
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </Form>
    )
}

export default Form.create()(FormComponent)