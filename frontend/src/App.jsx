import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';



function App() {

  const RegisterPage = lazy(() => import('./screens/RegisterPage/RegisterPage'));
  const LandingPage = lazy(() => import('./screens/LandingPage/LandingPage'));
  const CreateNote = lazy(() => import('./screens/CreateNote/CreateNote'));
  const SingleNote = lazy(() => import('./screens/SingleNote/SingleNote'));
  const LoginPage = lazy(() => import('./screens/LoginPage/LoginPage'));
  const MyNotes = lazy(() => import('./screens/MyNotes/MyNotes'));

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/mynotes" element={<MyNotes search={search} />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<SingleNote />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
