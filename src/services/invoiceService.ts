import API from './instance';

export interface Client {
  id: number;
  fullName: string;
  document: string;
}

export interface Invoice {
  id: number;
  client: Client;
  amount: number;
}

export interface InvoiceListResponse {
  invoices: Invoice[];
  status: boolean;
}

export interface CreateInvoiceRequest {
  clientData: {
    fullName: string;
    document: string;
  };
  amount: number;
}

export interface CreateInvoiceResponse {
  message: string;
  invoice: Invoice;
  status: boolean;
}

export const getInvoices = async (): Promise<InvoiceListResponse> => {
  try {
    const response = await API.get<InvoiceListResponse>('/invoice/list', {});
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const createInvoice = async (data: CreateInvoiceRequest): Promise<CreateInvoiceResponse> => {
  try {
    const response = await API.post<CreateInvoiceResponse>('/invoice', data);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};