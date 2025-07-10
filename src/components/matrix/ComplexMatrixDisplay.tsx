import React from 'react';
import { Card, Typography, Table, Collapse, Tag } from 'antd';
import styled from 'styled-components';
import { MatrixElement } from '@/services/matrixService';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MatrixCard = styled(Card)`
  margin: 16px 0;
  
  .ant-card-body {
    padding: 16px;
  }
`;

const MatrixTable = styled(Table)`
  .ant-table-cell {
    text-align: center;
    padding: 4px 8px;
    border: 1px solid #d9d9d9;
  }
  
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 600;
  }
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;

const ElementTag = styled(Tag)`
  margin: 1px;
  font-size: 10px;
  padding: 1px 4px;
`;

interface KijMatrixProps {
  title: string;
  matriz: MatrixElement[][];
}

const ItemElement = (element: MatrixElement) => (
  <ElementContainer>
    <ElementTag color="red">({element.B}, {element.A})</ElementTag>
    <ElementTag color="green">B: {element.B}</ElementTag>
    <ElementTag color="blue">A: {element.A}</ElementTag>
  </ElementContainer>
);

export const KijMatrixDisplay: React.FC<KijMatrixProps> = ({ title, matriz }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'col0',
      key: 'col0',
      width: 120,
      render: ItemElement,
    },
    {
      title: '',
      dataIndex: 'col1',
      key: 'col1',
      width: 120,
      render: ItemElement,
    },
    {
      title: '',
      dataIndex: 'col2',
      key: 'col2',
      width: 120,
      render: ItemElement,
    },
  ];

  const dataSource = matriz.map((row, index) => ({
    key: index,
    col0: row[0],
    col1: row[1],
    col2: row[2],
  }));

  return (
    <MatrixCard>
      <Title level={4}>{title}</Title>
      <MatrixTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        bordered
      />
    </MatrixCard>
  );
};

const MatrixRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const MatrixContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
`;

const MatrixTitle = styled(Text)`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  text-align: center;
  color: #1890ff;
`;

interface Matrix3DProps {
  title: string;
  matriz: MatrixElement[][][][];
}

export const Matrix3DDisplay: React.FC<Matrix3DProps> = ({ title, matriz }) => {
  const renderMatrix3x3 = (matrix3x3: MatrixElement[][], layerIndex: number, matrixIndex: number) => {
    const columns = [
      {
        title: '',
        dataIndex: 'col0',
        key: 'col0',
        width: 80,
        render: ItemElement,
      },
      {
        title: '',
        dataIndex: 'col1',
        key: 'col1',
        width: 80,
        render: ItemElement,
      },
      {
        title: '',
        dataIndex: 'col2',
        key: 'col2',
        width: 80,
        render: ItemElement,
      },
    ];

    const dataSource = matrix3x3.map((row, index) => ({
      key: index,
      col0: row[0],
      col1: row[1],
      col2: row[2],
    }));

    return (
      <MatrixContainer>
        <MatrixTitle>Matrix k{layerIndex + 1}{matrixIndex + 1}</MatrixTitle>
        <MatrixTable
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
          style={{ width: '100%' }}
        />
      </MatrixContainer>
    );
  };

  return (
    <MatrixCard style={{ width: '100%' }}>
      <Title level={4}>{title}</Title>
      <Collapse size="small">
        {matriz.map((layer, layerIndex) => (
          <Panel 
            header={`k ${layerIndex + 1}x`} 
            key={layerIndex}
          >
            <MatrixRow>
              {layer.map((matrix3x3, matrixIndex) => 
                renderMatrix3x3(matrix3x3, layerIndex, matrixIndex)
              )}
            </MatrixRow>
          </Panel>
        ))}
      </Collapse>
    </MatrixCard>
  );
};