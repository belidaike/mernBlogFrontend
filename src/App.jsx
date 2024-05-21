import { Routes, Route } from "react-router-dom"
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import { UserContextProvider } from './UserContext';
import SinglePost from './pages/SinglePost';
import Footer from "./pages/Footer";
import EditPost from "./pages/EditPost";

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/post/:id' element={<SinglePost />} />
            <Route path='/editpost/:id' element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
      <Footer />
    </>
  )
}

export default App;
