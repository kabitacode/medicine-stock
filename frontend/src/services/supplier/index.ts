import { api } from "../api";

export const fetchSupplier = async (token: string) => {
    try {
      const response = await api.get('/supplier', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchSupplierId = async (token: string, id: string) => {
    try {
      const response = await api.get(`supplier/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchSupplierAdd = async (token: string, postData: any) => {
    try {
      const response = await api.post('/supplier', postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchSupplierEdit = async (token: string, id: string, postData: any) => {
    try {
      const response = await api.patch(`supplier/${id}`, postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchSupplierDelete = async (token: string, id: string) => {
    try {
      const response = await api.delete(`supplier/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };