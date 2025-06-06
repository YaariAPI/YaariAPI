import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import * as React from 'react';

import Register from 'src/components/Auth/Register';
import Login from 'src/components/Auth/Login';
import ProtectedRoute from 'src/components/ProtectedRoute/ProtectedRoute';
import Dashboard from 'src/pages/Dashboard';
import { Settings } from 'lucide-react';
import Workspace from 'src/pages/Workspace';
import WhatsappInstants from 'src/pages/WhatsappInstants';
import Chats from 'src/pages/Chats';
import MainLayout from 'src/pages/MainLayout';
import Contacts from 'src/pages/Contacts';
import Template from 'src/pages/Template';
import Broadcast from 'src/pages/Broadcast';
import MailingList from 'src/pages/MailingList';
import LoadingPage from 'src/components/UI/Loadingpage';


const routes = createRoutesFromElements(
  <Route>
    <Route path="/register" element={<Register />} />
    <Route path="/register/:token" element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="chats" element={<Chats />} />
        <Route path="whatsappinstants" element={<WhatsappInstants />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="template" element={<Template />} />
        <Route path="mailinglist" element={<MailingList />} />
        <Route path="broadcast" element={<Broadcast />} />
        <Route path="loading" element={<LoadingPage />} />
      </Route>
    </Route >
  </Route>
);

export const router = createBrowserRouter(routes);