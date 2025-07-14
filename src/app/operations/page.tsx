'use client';

import React, { useState } from 'react';
import { Layout, Typography, message, Row, Col, Divider, Button, Space } from 'antd';
import { FileTextOutlined, CalculatorOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Matrix3x3Display } from '@/components/matrix/MatrixDisplay';
import { Matrix3DDisplay } from '@/components/matrix/ComplexMatrixDisplay';
import { transpuestaMatriz, MatrizRequest, MatrizResponse } from '@/services/matrixService';
import { MatrizForm2 } from '@/components/matrix/MatrixForm2';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatrizResponse | null>(null);

  const handleSubmit = async (data: MatrizRequest) => {
    setLoading(true);
    try {
      const response = await transpuestaMatriz(data);
      setResult(response);
      message.success('¡Matrices procesadas exitosamente!');
    } catch (error) {
      message.error('Error al procesar las matrices. Verifique que la API esté ejecutándose.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <Title level={1} style={{ margin: 0 }}>
              Procesador de Matrices
            </Title>
            <Space>
              <Button type="primary" icon={<CalculatorOutlined />}>
                Matrices
              </Button>
              <Button 
                type="primary" 
                icon={<FileTextOutlined />}
                onClick={() => router.push('/invoices')}
              >
                Facturas
              </Button>
            </Space>
          </div>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <MatrizForm2 onSubmit={handleSubmit} loading={loading} />
            </Col>
            
            <Col xs={24} lg={12}>
              {result && (
                <div>
                  <Title level={2}>Resultados</Title>
                  
                  <Divider />
                  
                  <Matrix3x3Display
                    title="Matriz trasversa"
                    matriz={result.message.data}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
