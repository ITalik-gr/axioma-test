import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import IndexPage from './IndexPage'
import Posts from './Posts'

function App() {

  return (
    <BrowserRouter>
      <nav className='nav'>
        <ul className="nav-list">
          <li className="nav-list__item"><a href="/">Home</a></li>
          <li className="nav-list__item"><a href="/posts">Posts</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
