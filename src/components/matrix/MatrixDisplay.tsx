import React from 'react';
import { Card, Typography, Table } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

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

interface MatrixDisplayProps {
  title: string;
  matriz: number[][] | string[][];
}

export const Matrix3x3Display: React.FC<MatrixDisplayProps> = ({ title, matriz }) => {
  const numCols = matriz[0]?.length || 0;
  
  const columns = Array.from({ length: numCols }, (_, index) => ({
    title: '',
    dataIndex: `col${index}`,
    key: `col${index}`,
    width: 80,
  }));

  const dataSource = matriz.map((row, index) => {
    const rowData: any = { key: index };
    row.forEach((cell, cellIndex) => {
      rowData[`col${cellIndex}`] = cell;
    });
    return rowData;
  });

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