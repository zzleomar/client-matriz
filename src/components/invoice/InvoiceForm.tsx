'use client';

import React from 'react';
import { Card, Form, Input, InputNumber, Button, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createInvoice, CreateInvoiceRequest } from '@/services/invoiceService';

const { Title } = Typography;

interface InvoiceFormProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onBack, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    
    const requestData: CreateInvoiceRequest = {
      clientData: {
        fullName: values.fullName,
        document: values.document,
      },
      amount: values.amount,
    };

    try {
      const response = await createInvoice(requestData);
      if (response.status) {
        message.success(response.message);
        form.resetFields();
        onSuccess?.();
      } else {
        message.error('Error al crear la factura');
      }
    } catch (error) {
      message.error('Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          style={{ marginRight: 16 }}
        >
          Volver
        </Button>
        <Title level={2} style={{ margin: 0 }}>
          Registrar Nueva Factura
        </Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Nombre Completo del Cliente"
          name="fullName"
          rules={[
            { required: true, message: 'Por favor ingrese el nombre completo' },
            { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
          ]}
        >
          <Input placeholder="Ej: Juan Pérez" />
        </Form.Item>

        <Form.Item
          label="Documento del Cliente"
          name="document"
          rules={[
            { required: true, message: 'Por favor ingrese el documento' },
            { pattern: /^\d+$/, message: 'El documento debe contener solo números' },
          ]}
        >
          <Input placeholder="Ej: 12345678" />
        </Form.Item>

        <Form.Item
          label="Monto"
          name="amount"
          rules={[
            { required: true, message: 'Por favor ingrese el monto' },
            { type: 'number', min: 0.01, message: 'El monto debe ser mayor a 0' },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Ej: 1500.50"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
            precision={2}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Crear Factura
            </Button>
            <Button onClick={() => form.resetFields()}>
              Limpiar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};