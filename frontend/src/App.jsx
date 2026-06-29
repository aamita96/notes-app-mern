import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';



function App() {

  const RegisterPage = lazy(() => import('./screens/RegisterPage/RegisterPage'));
  const LandingPage = lazy(() => import('./screens/LandingPage/LandingPage'));
  const LoginPage = lazy(() => import('./screens/LoginPage/LoginPage'));
  const MyNotes = lazy(() => import('./screens/MyNotes/MyNotes'));

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/mynotes" element={<MyNotes />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
