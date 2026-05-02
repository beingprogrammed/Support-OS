import { ROLES } from './constants';

export const hasRole = (user, roles) => {
  if (!user || !user.role) return false;
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(user.role);
};

export const isSuperAdmin = (user) => hasRole(user, ROLES.SUPER_ADMIN);
export const isAdmin = (user) => hasRole(user, [ROLES.ADMIN, ROLES.SUPER_ADMIN]);
export const isAgent = (user) => hasRole(user, [ROLES.AGENT, ROLES.ADMIN]);
export const isCustomer = (user) => hasRole(user, ROLES.CUSTOMER);
