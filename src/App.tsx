import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './component/notFound'
import Home from './component/mainComponent/pages/home'
import Profile from './component/mainComponent/pages/profile/profile'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}