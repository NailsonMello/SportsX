import React from 'react'
import { Layout, Breadcrumb } from 'antd';

import HeaderComponent from '../../components/header'
import HomeComponent from '../../components/home'

const { Content, Footer } = Layout

const Home = () => {
    return (
        <Layout className="layout">
            <HeaderComponent />
            <Content className="content-app">
                <Breadcrumb className="breadcrumb-app">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Lista Clientes</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <HomeComponent />
                </div>
            </Content>
            <Footer className="footer-app">Created by Nailson Melo * 2021</Footer>
        </Layout>
    )
}

export default Home;