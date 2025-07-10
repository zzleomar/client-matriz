import React from 'react';
import { Card, Typography, Table } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

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

interface Matrix3x3Props {
  title: string;
  matrix: number[][] | string[][];
}

export const Matrix3x3Display: React.FC<Matrix3x3Props> = ({ title, matrix }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'col0',
      key: 'col0',
      width: 80,
    },
    {
      title: '',
      dataIndex: 'col1',
      key: 'col1',
      width: 80,
    },
    {
      title: '',
      dataIndex: 'col2',
      key: 'col2',
      width: 80,
    },
  ];

  const dataSource = matrix.map((row, index) => ({
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