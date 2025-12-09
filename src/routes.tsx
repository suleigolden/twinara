import { Icon } from '@chakra-ui/react';
import {
  MdHome,
} from 'react-icons/md';
import { Role, User } from '@suleigolden/co-renting-api-client';
import { Dashboard } from './apps/dashboard/Dashboard';


export const adminRoutes = (user: User) => [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: `/${user.id}/admin-dashboard`,
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },

];

export const userRoutes = (user: User) => [
  {
    name: 'Dashboard',
    layout: '/user',
    path: `/${user.id}/dashboard`,
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
  },
];


export const navBarRoutes = (role: Role, user: User) => {
  
  switch (role) {
    case 'super-admin':
      return adminRoutes(user);
    default:
      return userRoutes(user);
      break;
  }
};