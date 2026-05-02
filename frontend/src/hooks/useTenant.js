import { useState, useEffect } from 'react';
import tenantService from '../services/tenantService';

export const useTenant = (tenantId) => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tenantId) {
      setLoading(true);
      tenantService.getTenantById(tenantId)
        .then(setTenant)
        .finally(() => setLoading(false));
    }
  }, [tenantId]);

  return { tenant, loading };
};
