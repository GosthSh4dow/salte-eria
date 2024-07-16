import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../img/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí va la lógica de autenticación
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FFA500' }}>
      <Card style={{ width: 300 }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Salteñería El Hornito" style={{ width: '150px' }} />
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
