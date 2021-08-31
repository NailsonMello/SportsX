import React, { useState, useEffect } from 'react'
import {
    Table,
    Tag,
    Space,
    Popconfirm,
    message,
    Input,
    Radio,
    Row,
    Col
} from 'antd'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import api from '../../service/api'
import Mobile from './mobile'

const { Search } = Input

const options = [
    { label: 'Todos', value: 'TODOS' },
    { label: 'CNPJ', value: 'CNPJ' },
    { label: 'CPF', value: 'CPF' }
]

const Home = () => {

    const [items, setItems] = useState([])
    const [itemsOriginal, setItemsOriginal] = useState([])
    const [optionsFilter, setOptionsFilter] = useState("TODOS")

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nomeCliente',
        },
        {
            title: 'CPF/CNPJ ',
            dataIndex: 'cpfCnpj',
            width: 220,
        },
        {
            title: 'Classificação',
            dataIndex: 'classificacao',
            width: 180,
        },
        {
            title: 'Telefones',
            dataIndex: 'telefones',
            width: 150,
            render: tags => (
                <>
                    {tags && tags.map(tag => {
                        return (
                            <Tag key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '',
            key: 'edit',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    <div className="update-item">
                        <Link
                            to={
                                {
                                    pathname: '/update-client',
                                    state: text
                                }
                            }>
                            Editar
                        </Link>
                    </div>
                </Space>
            ),
        },
        {
            title: '',
            key: 'delete',
            width: 30,
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Deseja realmente excluir registro?"
                        onConfirm={() => handleDeleteClient(text.idCliente)}
                        onCancel={() => { }}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <button className="delete-item" type="button">
                            Deletar
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsMobile = [
        {
            title: 'Nome',
            dataIndex: 'nomeCliente',
        },
    ];

    const onChangeOptions = e => {
        setOptionsFilter(e.target.value)
    };

    const handleDeleteClient = async id => {
        try {
            const res = await api.delete(`customers/${id}`)

            if (res.status === 200 && res.data.status === 1) {
                setItems(items.filter(item => item.idCliente !== id))
                message.success(res.data.message, 1)
            } else {
                message.error(res.data.message, 1)
            }
        } catch (error) {

            message.error(error, 1)
        }
    }

    useEffect(() => {
        api.get('customers')
            .then(res => {
                setItems(res.data)
                setItemsOriginal(res.data)
            })
    }, [])

    useEffect(() => {
        if (optionsFilter === 'CNPJ') {
            setItems(itemsOriginal.filter(e => e.tipoCliente === "PJ"))
        } else if (optionsFilter === 'CPF') {
            setItems(itemsOriginal.filter(e => e.tipoCliente === "PF"))
        } else {
            setItems(itemsOriginal)
        }
    }, [optionsFilter, itemsOriginal])

    const onSearch = value => {
        api.get(`customers?nomeCliente=${value}`)
            .then(res => {
                setItems(res.data)
            })
    }

    return (
        <>
            <Row gutter={24} className="ant-row-filter">
                <Col span={isTabletOrMobile ? 12 : 7}>
                    <Radio.Group
                        options={options}
                        onChange={onChangeOptions}
                        value={optionsFilter}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Col>
                <Col span={isTabletOrMobile ? 12 : 17}>
                    <Search
                        className="input-search-client"
                        placeholder="Digite o nome do cliente que deseja pesquisar"
                        onSearch={onSearch}
                        enterButton
                    />
                </Col>
            </Row>
            <Table
                columns={isTabletOrMobile ? columnsMobile : columns}
                dataSource={items}
                rowKey="idCliente"
                pagination={{ pageSize: 5 }}
                expandRowByClick={true}
                expandIconColumnIndex={isTabletOrMobile ? 2 : -1}
                expandedRowRender={(record, index) => isTabletOrMobile && <Mobile
                    data={record}
                    handleDeleteClient={handleDeleteClient}
                />}
            />
        </>
    )
}

export default Home;