'use client';

import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Button, message, Space } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { getInvoices, Invoice } from '@/services/invoiceService';

const { Title } = Typography;

interface InvoiceListProps {
  onCreateClick?: () => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ onCreateClick }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await getInvoices();
      if (response.status) {
        setInvoices(response.invoices);
        message.success('Facturas cargadas exitosamente');
      } else {
        message.error('Error al cargar las facturas');
      }
    } catch (error) {
      message.error('Error al conectar con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Cliente',
      dataIndex: ['client', 'fullName'],
      key: 'clientName',
    },
    {
      title: 'Documento',
      dataIndex: ['client', 'document'],
      key: 'clientDocument',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2} style={{ margin: 0 }}>
          Lista de Facturas
        </Title>
        <Space>
          <Button 
            type="default" 
            icon={<ReloadOutlined />} 
            onClick={fetchInvoices}
            loading={loading}
          >
            Actualizar
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={onCreateClick}
          >
            Nueva Factura
          </Button>
        </Space>
      </div>
      
      <Table
        dataSource={invoices}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} facturas`,
        }}
      />
    </Card>
  );
};