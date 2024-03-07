import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Components/Users';
import Posts from './Components/Posts';
import Comments from './Components/Comments';
import UserInfo from './Components/UserInfo';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts/:postid" element={<Comments />} />
          <Route path="/users/:userid" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
