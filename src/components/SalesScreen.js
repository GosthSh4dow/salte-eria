import React, { useState } from 'react';
import { Popconfirm,Layout, Tabs, Form, Input, InputNumber, Button, Table, Card, Row, Col, Modal, Tooltip, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;

const SalesScreen = () => {
  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState('');
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);

  const products = {
    saltenas: [
      { id: 1, name: 'Salteña de Pollo', price: 5, image: 'saltena_pollo.jpg' },
      { id: 2, name: 'Salteña de Carne', price: 6, image: 'saltena_carne.jpg' },
    ],
    refrescos: [
      { id: 3, name: 'Refresco Mini', price: 3, image: 'refresco_mini.jpg' },
      { id: 4, name: 'Refresco en Jarra', price: 10, image: 'refresco_jarra.jpg' },
    ],
  };

  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    calculateTotal();
  };

  const adjustQuantity = (productId, delta) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
    calculateTotal();
  };

  const deleteFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    calculateTotal();
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const startNewSale = () => {
    setCart([]);
    setClientName('');
    setIsSaleActive(true);
  };

  const handlePayment = () => {
    setPaymentModalVisible(true);
  };

  const handlePaymentOk = () => {
    notification.success({ message: 'Venta registrada exitosamente' });
    setPaymentModalVisible(false);
    startNewSale();
  };

  const handlePaymentCancel = () => {
    setPaymentModalVisible(false);
  };

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <InputNumber min={1} value={text} onChange={(value) => adjustQuantity(record.id, value - record.quantity)} />
      ),
    },
    {
      title: 'Precio Unitario',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => record.price * record.quantity,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => adjustQuantity(record.id, 0)} />
          <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={() => deleteFromCart(record.id)}>
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Content>
        <Row gutter={16}>
          <Col span={16}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Salteñas" key="1">
                <Row gutter={16}>
                  {products.saltenas.map(product => (
                    <Col span={12} key={product.id}>
                      <Card
                        cover={<img alt={product.name} src={product.image} />}
                        actions={[
                          <InputNumber min={1} defaultValue={1} onChange={(value) => addToCart(product, value)} />,
                          <Button style={{ backgroundColor: '#000', color: '#fff' }} onClick={() => addToCart(product)}>+</Button>,
                          <Tooltip title="Agregar 1">
                            <Button style={{ backgroundColor: '#FFA500', color: '#000' }} onClick={() => addToCart(product, 1)}>➕</Button>
                          </Tooltip>,
                        ]}
                      >
                        <Card.Meta title={product.name} description={`Bs. ${product.price}`} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Refrescos" key="2">
                <Row gutter={16}>
                  {products.refrescos.map(product => (
                    <Col span={12} key={product.id}>
                      <Card
                        cover={<img alt={product.name} src={product.image} />}
                        actions={[
                          <InputNumber min={1} defaultValue={1} onChange={(value) => addToCart(product, value)} />,
                          <Button style={{ backgroundColor: '#000', color: '#fff' }} onClick={() => addToCart(product)}>+</Button>,
                          <Tooltip title="Agregar 1">
                            <Button style={{ backgroundColor: '#FFA500', color: '#000' }} onClick={() => addToCart(product, 1)}>➕</Button>
                          </Tooltip>,
                        ]}
                      >
                        <Card.Meta title={product.name} description={`Bs. ${product.price}`} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </TabPane>
              <TabPane tab="Pedidos" key="3">
                {/* Aquí se pueden agregar componentes para la gestión de pedidos */}
                <div>Gestión de Pedidos</div>
              </TabPane>
              <TabPane tab="Reservas" key="4">
                {/* Aquí se pueden agregar componentes para la gestión de reservas */}
                <div>Gestión de Reservas</div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={8}>
            <Form layout="vertical">
              <Form.Item label="Nombre del Cliente">
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} disabled={!isSaleActive} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={startNewSale}>Nueva Venta</Button>
              </Form.Item>
            </Form>
            <Table
              dataSource={cart}
              columns={columns}
              pagination={false}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={3}>Total</Table.Summary.Cell>
                  <Table.Summary.Cell>
                    Bs. {calculateTotal()}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
            <Button type="primary" onClick={handlePayment} style={{ marginTop: '16px' }}>Cobrar</Button>
          </Col>
        </Row>
        <Modal
          title="Cobro"
          visible={paymentModalVisible}
          onOk={handlePaymentOk}
          onCancel={handlePaymentCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Cantidad Pagada">
              <InputNumber
                min={0}
                value={amountPaid}
                onChange={setAmountPaid}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Cambio a Entregar">
              <InputNumber
                value={amountPaid - calculateTotal()}
                disabled
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default SalesScreen;