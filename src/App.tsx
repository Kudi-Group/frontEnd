import './index.css'
import Login from './auth/Login'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Dashboard, LoanEntryForm, SchedulePage } from './pages'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";


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

        {/* Define the User Layout with Nested Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="loan-form" element={<LoanEntryForm />} />
          <Route path="schedule" element={<SchedulePage/>} />
        </Route>

      </Routes>

     
    </BrowserRouter>
  )
}

export default App
