import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './_auth/Forms/SignIn'
import AuthLayout from './_auth/AuthLayout'
import SignUp from './_auth/Forms/SignUp'
import RootLayout from './_root/RootLayout'
import Home from './_root/pages/Home'
import ProtectedLayout from './Protected/ProtectedLayout'
// import ProtectedLayout from "./Protected/ProtectedLayout"


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route element={<ProtectedLayout />}>
        <Route element={<AuthLayout />}>
          <Route  path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
        </Route>
      </Route>
    </Route>




))
function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App
