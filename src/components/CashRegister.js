import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Form, Input, InputNumber, Button, Table, DatePicker, Modal, Tooltip, notification, Typography } from 'antd';
import { DollarCircleOutlined, FileSearchOutlined, PlusOutlined, MinusOutlined, BarChartOutlined, FileAddOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title } = Typography;

const CashRegister = () => {
  const [dailySales, setDailySales] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({});
  const [isSummaryFixed, setIsSummaryFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSummaryFixed(true);
      } else {
        setIsSummaryFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModalOpen = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (modalType === 'expense') {
      setExpenses([...expenses, { ...modalData, key: expenses.length }]);
    } else if (modalType === 'request') {
      setRequests([...requests, { ...modalData, key: requests.length }]);
    }
    setIsModalVisible(false);
    setModalData({});
    notification.success({ message: 'Registro añadido exitosamente' });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setModalData({});
  };

  const handleModalChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (value) => {
    setModalData({ ...modalData, amount: value });
  };

  const handleDateChange = (date, dateString) => {
    setModalData({ ...modalData, date: dateString });
  };

  const calculateTotal = (data) => {
    return data.reduce((total, item) => total + item.amount, 0);
  };

  const dailySalesColumns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: text => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  const expensesColumns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: text => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const requestsColumns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: text => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Aprobado por',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
  ];

  const summaryStyle = {
    position: isSummaryFixed ? 'fixed' : 'relative',
    bottom: isSummaryFixed ? '16px' : 'auto',
    right: isSummaryFixed ? '16px' : 'auto',
    background: '#fff',
    padding: '16px',
    boxShadow: isSummaryFixed ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none',
    zIndex: isSummaryFixed ? 1000 : 'auto',
    textAlign: 'right'
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Content>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><DollarCircleOutlined />Arqueo Diario</span>} key="1">
            <Button type="primary" icon={<FileAddOutlined />} onClick={() => handleModalOpen('expense')}>Registrar Gasto</Button>
            <Button type="primary" icon={<FileAddOutlined />} onClick={() => handleModalOpen('request')} style={{ marginLeft: '8px' }}>Solicitud de Dinero</Button>
            <Title level={3} style={{ marginTop: '16px' }}>Ventas Diarias</Title>
            <Table dataSource={dailySales} columns={dailySalesColumns} style={{ marginTop: '16px' }} />
            <Title level={3} style={{ marginTop: '16px' }}>Gastos Diarios</Title>
            <Table dataSource={expenses} columns={expensesColumns} style={{ marginTop: '16px' }} />
            <Title level={3} style={{ marginTop: '16px' }}>Solicitudes de Dinero</Title>
            <Table dataSource={requests} columns={requestsColumns} style={{ marginTop: '16px' }} />
          </TabPane>
          <TabPane tab={<span><BarChartOutlined />Arqueo Semanal</span>} key="2">
            <Title level={3} style={{ marginTop: '16px' }}>Ventas Semanales</Title>
            <Table dataSource={weeklySales} columns={dailySalesColumns} style={{ marginTop: '16px' }} />
            <Title level={3} style={{ marginTop: '16px' }}>Gastos Semanales</Title>
            <Table dataSource={expenses} columns={expensesColumns} style={{ marginTop: '16px' }} />
          </TabPane>
        </Tabs>
        <div style={summaryStyle}>
          <h3>Total Ventas: Bs. {calculateTotal(dailySales)}</h3>
          <h3>Total Gastos: Bs. {calculateTotal(expenses)}</h3>
          <h3>Utilidad: Bs. {calculateTotal(dailySales) - calculateTotal(expenses)}</h3>
          <h3>Total Ventas Semanales: Bs. {calculateTotal(weeklySales)}</h3>
          <h3>Total Gastos Semanales: Bs. {calculateTotal(expenses)}</h3>
          <h3>Utilidad Semanal: Bs. {calculateTotal(weeklySales) - calculateTotal(expenses)}</h3>
        </div>
        <Modal
          title={modalType === 'expense' ? "Registrar Gasto" : "Solicitud de Dinero"}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Fecha">
              <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Monto">
              <InputNumber
                min={0}
                value={modalData.amount}
                onChange={handleAmountChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Descripción">
              <Input name="description" value={modalData.description} onChange={handleModalChange} />
            </Form.Item>
            {modalType === 'request' && (
              <Form.Item label="Aprobado por">
                <Input name="approvedBy" value={modalData.approvedBy} onChange={handleModalChange} />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default CashRegister;
