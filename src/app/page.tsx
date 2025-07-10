'use client';

import React, { useState } from 'react';
import { Layout, Typography, message, Row, Col, Divider } from 'antd';
import { MatrixForm } from '@/components/matrix/MatrixForm';
import { Matrix3x3Display } from '@/components/matrix/MatrixDisplay';
import { KijMatrixDisplay, Matrix3DDisplay } from '@/components/matrix/ComplexMatrixDisplay';
import { processMatrices, MatrixRequest, MatrixResponse } from '@/services/matrixService';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
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
          <Title level={1} style={{ textAlign: 'center', marginBottom: '32px' }}>
            Procesador de Matrices
          </Title>
          
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
                    matrix={result.message.data.matrix1}
                  />
                  
                  <Matrix3x3Display
                    title="Matriz 2 (Entrada)"
                    matrix={result.message.data.matrix2}
                  />
                  
                  <KijMatrixDisplay
                    title="Matriz Kij (Resultado)"
                    matrix={result.message.data.Kij}
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
                  matrix={result.message.data.matrix3}
                />
              </Col>
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
}
