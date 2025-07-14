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

const MatrixGrid = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
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
    const [rows, setRows] = useState<number>(3);
    const [cols, setCols] = useState<number>(3);
    const [showMatrix, setShowMatrix] = useState(false);
    const [matriz1, setMatrix1] = useState<any[][]>([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);


    const createMatrix = (rows: number, cols: number) => {
        return Array(rows).fill(null).map(() => 
            Array(cols).fill(null).map(() => Math.floor(Math.random() * 9) + 1)
        );
    };

    const handleDimensionsSubmit = () => {
        if (rows < 1 || cols < 1) {
            message.error('Las dimensiones deben ser números positivos');
            return;
        }
        const newMatrix = createMatrix(rows, cols);
        setMatrix1(newMatrix);
        setShowMatrix(true);
    };

    const handleMatrix1Change = (row: number, col: number, value: string) => {
        const numValue = parseInt(value) || value.charAt(0);
        const newMatrix = [...matriz1];
        newMatrix[row][col] = numValue;
        setMatrix1(newMatrix);
    };

    const handleBack = () => {
        setShowMatrix(false);
    };

    const handleSubmit = () => {

        onSubmit({
            matriz: matriz1,
        });
    };

    const renderMatrix1 = () => (
        <MatrixGrid cols={cols}>
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

    const renderDimensionsForm = () => (
        <div>
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Text strong>Número de filas:</Text>
                    <InputNumber
                        min={1}
                        max={10}
                        value={rows}
                        onChange={(value) => setRows(value || 1)}
                        style={{ width: '100%', marginTop: 8 }}
                        placeholder="Filas"
                    />
                </Col>
                <Col span={12}>
                    <Text strong>Número de columnas:</Text>
                    <InputNumber
                        min={1}
                        max={10}
                        value={cols}
                        onChange={(value) => setCols(value || 1)}
                        style={{ width: '100%', marginTop: 8 }}
                        placeholder="Columnas"
                    />
                </Col>
            </Row>
            <Button
                type="primary"
                onClick={handleDimensionsSubmit}
                style={{ width: '100%' }}
            >
                Crear Matriz {rows}x{cols}
            </Button>
        </div>
    );

    return (
        <FormCard>
            <Title level={3}>Procesador de Matrices</Title>
            <Text type="secondary">
                {!showMatrix ? 'Configura las dimensiones de la matriz' : 'Ingresa los valores de la matriz'}
            </Text>

            {!showMatrix ? (
                <div>
                    <SectionTitle level={4}>Dimensiones de la Matriz</SectionTitle>
                    {renderDimensionsForm()}
                </div>
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                        <SectionTitle level={4}>Matriz {rows}x{cols}</SectionTitle>
                        <Button onClick={handleBack} size="small">
                            Cambiar dimensiones
                        </Button>
                    </div>
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
                </div>
            )}
        </FormCard>
    );
};