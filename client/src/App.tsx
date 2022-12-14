import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiaryCreate from './pages/DiaryCreate';
import DiaryEdit from './pages/DiaryEdit';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useSignUserMutation } from './service/api/authApi';

function App() {
  const [signUser, {data, isLoading}] = useSignUserMutation();

  useEffect(() => {
    const tt = signUser('ad')
    console.log(tt)
    console.log(data)
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/:id/create" element={<DiaryCreate />}></Route>
        <Route path="/:id/edit" element={<DiaryEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
