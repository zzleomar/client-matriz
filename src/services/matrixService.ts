import API from './instance';

export interface MatrixRequest {
  matrix1: number[][];
  matrix2: string[][];
  i: number;
  j: number;
}

export interface MatrizRequest {
  matriz: any[][];
}

export interface MatrixElement {
  A: number;
  B: string;
}

export interface MatrixResponse {
  message: {
    data: {
      matriz1: number[][];
      matriz2: string[][];
      matriz3: MatrixElement[][][][];
      Kij: MatrixElement[][];
    };
    message: string;
  };
}

export interface MatrizResponse {
  message: {
    data: any[][];
    message: string;
  };
}

export const processMatrices = async (data: MatrixRequest): Promise<MatrixResponse> => {
  try {
    const response = await API.post<MatrixResponse>('/matriz', data);
    return response.data;
  } catch (error) {
    console.error('Error processing matrices:', error);
    throw error;
  }
};

export const transpuestaMatriz = async (data: MatrizRequest): Promise<MatrizResponse> => {
  try {
    const response = await API.post<MatrizResponse>('/operation/traspuesta', data);
    return response.data;
  } catch (error) {
    console.error('Error processing matrices:', error);
    throw error;
  }
};