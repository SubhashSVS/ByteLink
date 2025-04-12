import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Loading from './pages/Loading'

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/:shortId' element={<Loading />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
