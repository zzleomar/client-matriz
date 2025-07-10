import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, InputNumber, message } from 'antd';
import styled from 'styled-components';
import { MatrixRequest } from '@/services/matrixService';

const { Title, Text } = Typography;

const FormCard = styled(Card)`
  margin: 16px 0;
  
  .ant-card-body {
    padding: 24px;
  }
`;

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 16px 0;
`;

const MatrixInput = styled(Input)`
  text-align: center;
`;

const SectionTitle = styled(Title)`
  margin-top: 24px !important;
  margin-bottom: 16px !important;
`;

interface MatrixFormProps {
  onSubmit: (data: MatrixRequest) => void;
  loading: boolean;
}

export const MatrixForm: React.FC<MatrixFormProps> = ({ onSubmit, loading }) => {
  const [matrix1, setMatrix1] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  
  const [matrix2, setMatrix2] = useState<string[][]>([
    ['a', 'c', 'b'],
    ['b', 'a', 'c'],
    ['c', 'b', 'a']
  ]);
  
  const [i, setI] = useState<number>(1);
  const [j, setJ] = useState<number>(2);

  const handleMatrix1Change = (row: number, col: number, value: string) => {
    const numValue = parseInt(value) || 0;
    const newMatrix = [...matrix1];
    newMatrix[row][col] = numValue;
    setMatrix1(newMatrix);
  };

  const handleMatrix2Change = (row: number, col: number, value: string) => {
    const newMatrix = [...matrix2];
    newMatrix[row][col] = value;
    setMatrix2(newMatrix);
  };

  const handleSubmit = () => {
    if (i < 1 || i > 3 || j < 1 || j > 3) {
      message.error('Los valores de i y j deben estar entre 1 y 3');
      return;
    }
    
    onSubmit({
      matrix1,
      matrix2,
      i,
      j
    });
  };

  const renderMatrix1 = () => (
    <MatrixGrid>
      {matrix1.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <MatrixInput
            key={`${rowIndex}-${colIndex}`}
            value={value.toString()}
            onChange={(e) => handleMatrix1Change(rowIndex, colIndex, e.target.value)}
            placeholder={`${rowIndex},${colIndex}`}
          />
        ))
      )}
    </MatrixGrid>
  );

  const renderMatrix2 = () => (
    <MatrixGrid>
      {matrix2.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <MatrixInput
            key={`${rowIndex}-${colIndex}`}
            value={value}
            onChange={(e) => handleMatrix2Change(rowIndex, colIndex, e.target.value)}
            placeholder={`${rowIndex},${colIndex}`}
          />
        ))
      )}
    </MatrixGrid>
  );

  return (
    <FormCard>
      <Title level={3}>Procesador de Matrices</Title>
      <Text type="secondary">
        Ingresa las matrices y los valores i, j para procesarlas
      </Text>
      
      <SectionTitle level={4}>Matriz 1 (Números)</SectionTitle>
      {renderMatrix1()}
      
      <SectionTitle level={4}>Matriz 2 (Strings)</SectionTitle>
      {renderMatrix2()}
      
      <SectionTitle level={4}>Parámetros</SectionTitle>
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Valor i:</Text>
          <InputNumber
            min={1}
            max={3}
            value={i}
            onChange={(value) => setI(value ?? 0)}
            style={{ width: '100%', marginTop: 8 }}
          />
        </Col>
        <Col span={12}>
          <Text strong>Valor j:</Text>
          <InputNumber
            min={1}
            max={3}
            value={j}
            onChange={(value) => setJ(value ?? 0)}
            style={{ width: '100%', marginTop: 8 }}
          />
        </Col>
      </Row>
      
      <Button
        type="primary"
        size="large"
        loading={loading}
        onClick={handleSubmit}
        style={{ marginTop: 24, width: '100%' }}
      >
        Procesar Matrices
      </Button>
    </FormCard>
  );
};