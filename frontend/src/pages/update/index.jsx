import React from 'react'
import { Layout, Breadcrumb } from 'antd'

import HeaderComponent from '../../components/header'
import FormRegister from '../../components/form'

const { Content, Footer } = Layout

const Update = () => {

    return (
        <Layout className="layout">
            <HeaderComponent />
            <Content className="content-app">
                <Breadcrumb className="breadcrumb-app">
                    <Breadcrumb.Item>Alteração</Breadcrumb.Item>
                    <Breadcrumb.Item>Cliente</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <FormRegister />
                </div>
            </Content>
            <Footer className="footer-app">Created by Nailson Melo * 2021</Footer>
        </Layout>
    )
}

export default Update;