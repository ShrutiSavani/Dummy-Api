import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Components/Users';
import Posts from './Components/Posts';
import Comments from './Components/Comments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/comments/:postid" element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
