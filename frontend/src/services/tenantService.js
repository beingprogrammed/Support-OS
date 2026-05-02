import axiosInstance from './axiosInstance';

const tenantService = {
  getTenants: async () => {
    const response = await axiosInstance.get('/tenants');
    return response.data;
  },
  getTenantById: async (id) => {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  },
  createTenant: async (tenantData) => {
    const response = await axiosInstance.post('/tenants', tenantData);
    return response.data;
  },
  updateTenant: async (id, tenantData) => {
    const response = await axiosInstance.patch(`/tenants/${id}`, tenantData);
    return response.data;
  },
};

export default tenantService;
