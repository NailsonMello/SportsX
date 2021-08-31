import React from 'react'
import {
    Row,
    Col,
    Typography,
    Tag,
    Space,
    Popconfirm
} from 'antd'
import { Link } from 'react-router-dom'

const { Text } = Typography
const Mobile = ({
    data,
    handleDeleteClient
}) => {
    return (
        <>
            <Row gutter={24} className="row-item-mobile">
                <Col span={8}>
                    <Text>
                        CPF/CNPJ:
                    </Text>
                </Col>
                <Col span={16}>
                    <Text>
                        {data.cpfCnpj}
                    </Text>
                </Col>
            </Row>
            <Row gutter={24} className="row-item-mobile">
                <Col span={8}>
                    <Text>
                        Classificação:
                    </Text>
                </Col>
                <Col span={16}>
                    <Text>
                        {data.classificacao}
                    </Text>
                </Col>
            </Row>
            <Row gutter={24} className="row-item-mobile">
                <Col span={8}>
                    <Text>
                        Telefones:
                    </Text>
                </Col>
                <Col span={16}>
                    {data.telefones.map(tel => {
                        return (
                            <Tag key={tel}>
                                {tel}
                            </Tag>
                        )
                    })}
                </Col>
            </Row>
            <Row gutter={24} className="row-item-mobile">
                <Col span={12}>
                    <Space size="middle">
                        <div className="update-item">
                            <Link
                                to={
                                    {
                                        pathname: '/update-client',
                                        state: data
                                    }
                                }>
                                Editar
                            </Link>
                        </div>
                    </Space>
                </Col>
                <Col span={12}>
                    <Space size="middle">
                        <Popconfirm
                            title="Deseja realmente excluir registro?"
                            onConfirm={() => handleDeleteClient(data.idCliente)}
                            onCancel={() => { }}
                            okText="Sim"
                            cancelText="Não"
                        >
                            <button className="delete-item" type="button">
                                Deletar
                            </button>
                        </Popconfirm>
                    </Space>
                </Col>
            </Row>
        </>
    )
}

export default Mobile;