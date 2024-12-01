import './index.css'
import Login from './auth/Login'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Dashboard, LoanEntryForm } from './pages'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SignUp from './auth/sign-up';

function UserLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <SidebarTrigger />
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </SidebarProvider>
  );
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* Define the User Layout with Nested Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="loan-form" element={<LoanEntryForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
