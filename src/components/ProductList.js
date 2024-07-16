import React, { useState } from 'react';
import { Layout, Tabs, Form, Input, InputNumber, Select, Upload, Button, Table, Popconfirm, notification } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { TabPane } = Tabs;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const addProduct = (values) => {
    setProducts([...products, { ...values, key: products.length }]);
    notification.success({ message: 'Producto agregado exitosamente' });
  };

  const editProduct = (key, values) => {
    setProducts(products.map(product => (product.key === key ? { ...product, ...values } : product)));
    notification.success({ message: 'Producto modificado exitosamente' });
  };

  const deleteProduct = (key) => {
    setProducts(products.filter(product => product.key !== key));
    notification.success({ message: 'Producto eliminado exitosamente' });
  };

  const addMaterial = (values) => {
    setMaterials([...materials, { ...values, key: materials.length }]);
    notification.success({ message: 'Material agregado exitosamente' });
  };

  const editMaterial = (key, values) => {
    setMaterials(materials.map(material => (material.key === key ? { ...material, ...values } : material)));
    notification.success({ message: 'Material modificado exitosamente' });
  };

  const deleteMaterial = (key) => {
    setMaterials(materials.filter(material => material.key !== key));
    notification.success({ message: 'Material eliminado exitosamente' });
  };

  const columns = (editHandler, deleteHandler) => [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio/Cantidad',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => editHandler(record.key)} />
          <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={() => deleteHandler(record.key)}>
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', padding: '16px' }}>
      <Content>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Productos" key="1">
            <Form
              onFinish={addProduct}
              layout="inline"
              style={{ marginBottom: '16px' }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Por favor ingresa el nombre del producto' }]}
              >
                <Input placeholder="Nombre del producto" />
              </Form.Item>
              <Form.Item
                name="value"
                rules={[{ required: true, message: 'Por favor ingresa el precio' }]}
              >
                <InputNumber placeholder="Precio" />
              </Form.Item>
              <Form.Item
                name="category"
                rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
              >
                <Select placeholder="Categoría">
                  <Select.Option value="saltena">Salteña</Select.Option>
                  <Select.Option value="refresco-mini">Refresco Mini</Select.Option>
                  <Select.Option value="refresco-jarra">Refresco en Jarra</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                rules={[{ required: true, message: 'Por favor sube una imagen' }]}
              >
                <Upload name="image" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Subir Imagen</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Agregar Producto</Button>
              </Form.Item>
            </Form>
            <Table
              dataSource={products}
              columns={columns(editProduct, deleteProduct)}
            />
          </TabPane>
          <TabPane tab="Materiales" key="2">
            <Form
              onFinish={addMaterial}
              layout="inline"
              style={{ marginBottom: '16px' }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Por favor ingresa el nombre del material' }]}
              >
                <Input placeholder="Nombre del material" />
              </Form.Item>
              <Form.Item
                name="value"
                rules={[{ required: true, message: 'Por favor ingresa la cantidad' }]}
              >
                <InputNumber placeholder="Cantidad" />
              </Form.Item>
              <Form.Item
                name="category"
                rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
              >
                <Select placeholder="Categoría">
                  <Select.Option value="ingrediente">Ingrediente</Select.Option>
                  <Select.Option value="empaque">Empaque</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                rules={[{ required: true, message: 'Por favor sube una imagen' }]}
              >
                <Upload name="image" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Subir Imagen</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Agregar Material</Button>
              </Form.Item>
            </Form>
            <Table
              dataSource={materials}
              columns={columns(editMaterial, deleteMaterial)}
            />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default ProductList;
