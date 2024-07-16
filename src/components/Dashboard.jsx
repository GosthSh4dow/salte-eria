import React, { useState } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  FileOutlined,
} from '@ant-design/icons';
import ProductList from './ProductList';
import SalesScreen from './SalesScreen';
import CashRegister from './CashRegister';
import Report from './Report';

const { Content, Sider, Header } = Layout;

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <div>Bienvenido al Dashboard</div>;
      case '2':
        return <ProductList />;
      case '3':
        return <SalesScreen />;
      case '4':
        return <CashRegister />;
      case '5':
        return <Report />;
      default:
        return <div>Bienvenido al Dashboard</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#FFA500', position: 'fixed', height: '100vh' }}>
        <div style={{ padding: '16px', textAlign: 'center', background: '#8B4513', color: '#FFFFFF' }}>
          <Avatar size={64} style={{ backgroundColor: '#FFFFFF', color: '#8B4513' }}>U</Avatar>
          <div style={{ marginTop: '8px' }}>Usuario</div>
          <div>Administrador</div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: '#FFA500', padding: '16px 0' }}
          onClick={(e) => setSelectedMenuItem(e.key)}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Productos e Inventarios
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Ventas
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            Arqueo de Caja
          </Menu.Item>
          <Menu.Item key="5" icon={<FileOutlined />}>
            Reportes
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#8B4513', padding: 0, color: '#FFFFFF', textAlign: 'center', position: 'fixed', width: '100%', zIndex: 1 }}>
          <h1>Salteñería El Hornito</h1>
        </Header>
        <Content style={{ margin: '16px', marginTop: 64, padding: '16px', overflowY: 'auto', height: 'calc(100vh - 80px)' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
