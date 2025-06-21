
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.scss'
import IndexPage from './IndexPage'
import Posts from './Posts'

function App() {

  return (
    <BrowserRouter>
      <nav className='nav'>
        <ul className="nav-list">
          <li className="nav-list__item"><Link to="/">Home</Link></li>
          <li className="nav-list__item"><Link to="/posts">Posts</Link></li>
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
