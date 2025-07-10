'use client';

import React, { useState } from 'react';
import { Layout, Typography, message, Row, Col, Divider, Button, Space } from 'antd';
import { FileTextOutlined, CalculatorOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { MatrixForm } from '@/components/matrix/MatrixForm';
import { Matrix3x3Display } from '@/components/matrix/MatrixDisplay';
import { KijMatrixDisplay, Matrix3DDisplay } from '@/components/matrix/ComplexMatrixDisplay';
import { processMatrices, MatrixRequest, MatrixResponse } from '@/services/matrixService';

const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatrixResponse | null>(null);

  const handleSubmit = async (data: MatrixRequest) => {
    setLoading(true);
    try {
      const response = await processMatrices(data);
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
              <MatrixForm onSubmit={handleSubmit} loading={loading} />
            </Col>
            
            <Col xs={24} lg={12}>
              {result && (
                <div>
                  <Title level={2}>Resultados</Title>
                  
                  <Divider />
                  
                  <Matrix3x3Display
                    title="Matriz 1 (Entrada)"
                    matriz={result.message.data.matriz1}
                  />
                  
                  <Matrix3x3Display
                    title="Matriz 2 (Entrada)"
                    matriz={result.message.data.matriz2}
                  />
                  
                  <KijMatrixDisplay
                    title="Matriz Kij (Resultado)"
                    matriz={result.message.data.Kij}
                  />
                </div>
              )}
            </Col>
          </Row>
          
          {/* Matriz 3D ocupa todo el ancho */}
          {result && (
            <Row style={{ marginTop: 24 }}>
              <Col span={24}>
                <Matrix3DDisplay
                  title="Matriz 9x9 en secciones (Completa)"
                  matriz={result.message.data.matriz3}
                />
              </Col>
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
}
