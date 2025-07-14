import React, { useState } from 'react';
import { Input, Button, Card, Typography, Row, Col, InputNumber, message } from 'antd';
import styled from 'styled-components';
import { MatrizRequest } from '@/services/matrixService';

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
    onSubmit: (data: MatrizRequest) => void;
    loading: boolean;
}

export const MatrizForm2: React.FC<MatrixFormProps> = ({ onSubmit, loading }) => {
    const [matriz1, setMatrix1] = useState<any[][]>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);


    const handleMatrix1Change = (row: number, col: number, value: string) => {
        const numValue = parseInt(value) || value.charAt(0);
        const newMatrix = [...matriz1];
        newMatrix[row][col] = numValue;
        setMatrix1(newMatrix);
    };

    const handleSubmit = () => {

        onSubmit({
            matriz: matriz1,
        });
    };

    const renderMatrix1 = () => (
        <MatrixGrid>
            {matriz1.map((row, rowIndex) =>
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

    return (
        <FormCard>
            <Title level={3}>Procesador de Matrices</Title>
            <Text type="secondary">
                Ingresa la matriz
            </Text>

            <SectionTitle level={4}>Matriz</SectionTitle>
            {renderMatrix1()}


            <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={handleSubmit}
                style={{ marginTop: 24, width: '100%' }}
            >
                Procesar Matriz
            </Button>
        </FormCard>
    );
};