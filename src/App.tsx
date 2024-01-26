import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './_auth/Forms/SignIn'
import AuthLayout from './_auth/AuthLayout'
import SignUp from './_auth/Forms/SignUp'
import RootLayout from './_root/RootLayout'
import Home from './_root/pages/Home'
import ProtectedLayout from './Protected/ProtectedLayout'
// import ProtectedLayout from "./Protected/ProtectedLayout"
import { Toaster } from "@/components/ui/toaster"
import QueryProvider from './lib/react-query/QueryProvider'
import AuthProvider from './context/AuthContext'
import Explore from './_root/pages/Explore'
import Saved from './_root/pages/Saved'
import AllUsers from './_root/pages/AllUsers'
import CreatePost from './_root/pages/CreatePost'
import EditPost from './_root/pages/EditPost'
import PostDetails from './_root/pages/PostDetails'
import Profile from './_root/pages/Profile'
import UpdateProfile from './_root/pages/UpdateProfile'


// const router = createBrowserRouter(createRoutesFromElements(
//   <>


//   <Route path='/' element={<RootLayout />}>
//       <Route index element={<Home />} />
//     </Route>
//       <Route element={<ProtectedLayout />}>
//         <Route element={<AuthLayout />}>
//           <Route  path='/sign-in' element={<SignIn/>}/>
//           <Route path='/sign-up' element={<SignUp/>}/>
//         </Route>
//       </Route>

//     </>




// ))
function App() {


  return (

    <main className='flex h-screen'>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
        </Route>

        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App
// <>
//  {/* <QueryProvider> */ }
// {/* <AuthProvider> */ }

// {/* <RouterProvider router={router} /> */ }
// {/* <Toaster/> */ }
// {/* </AuthProvider> */ }
// {/* </QueryProvider> */ }
// </>
