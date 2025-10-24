import { Route, Routes } from 'react-router-dom'
import './App.css'
import { UserList } from './component/UserList'
import UserDetail from './component/UserDetail'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/users" element={<UserDetail />} />
      </Routes>
    </>
  )
}

export default App

