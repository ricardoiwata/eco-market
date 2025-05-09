import { Typography } from '@mui/material';
import React from 'react';

import ProductList from './ProductList';
import UserList from './UserList';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Admin Dashboard</Typography>
      <UserList />
      <ProductList />
    </div>
  );
};

export default AdminDashboard;