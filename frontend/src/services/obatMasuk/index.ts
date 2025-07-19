import { api } from "../api";

export const fetchObatMasuk = async (token: string) => {
    try {
      const response = await api.get('/obatMasuk', {
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

  export const fetchObatMasukId = async (token: string, id: string) => {
    try {
      const response = await api.get(`obatMasuk/${id}`, {
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

  export const fetchObatMasukAdd = async (token: string, postData: any) => {
    try {
      const response = await api.post('/obatMasuk', postData, {
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

  export const fetchObatMasukEdit = async (token: string, id: string, postData: any) => {
    try {
      const response = await api.patch(`obatMasuk/${id}`, postData, {
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

  export const fetchObatMasukDelete = async (token: string, id: string) => {
    try {
      const response = await api.delete(`obatMasuk/${id}`, {
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