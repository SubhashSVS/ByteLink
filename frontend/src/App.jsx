import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Loading from './pages/Loading'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/:shortId' element={<Loading />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
