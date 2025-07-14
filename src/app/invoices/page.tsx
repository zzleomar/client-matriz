'use client';

import React, { useState } from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { FileTextOutlined, CalculatorOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';

const { Content } = Layout;
const { Title } = Typography;

type View = 'list' | 'form';

export default function InvoicesPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<View>('list');

  const handleCreateClick = () => {
    setCurrentView('form');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  const handleSuccess = () => {
    setCurrentView('list');
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <Title level={1} style={{ margin: 0 }}>
              Gestión de Facturas
            </Title>
            <Space>
              <Button 
                type="default" 
                icon={<CalculatorOutlined />}
                onClick={() => router.push('/')}
              >
                Matrices
              </Button>
              <Button type="primary" icon={<FileTextOutlined />}>
                Facturas
              </Button>
              <Button 
                type="default" 
                onClick={() => router.push('/operations')}
              >
                Matriz Trasversa
              </Button>
            </Space>
          </div>
          
          {currentView === 'list' && (
            <InvoiceList onCreateClick={handleCreateClick} />
          )}
          
          {currentView === 'form' && (
            <InvoiceForm onBack={handleBack} onSuccess={handleSuccess} />
          )}
        </div>
      </Content>
    </Layout>
  );
}