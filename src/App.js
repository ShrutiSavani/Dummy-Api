import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Components/Users';
import Posts from './Components/Posts';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>


      {/* <Users /> */}
    </div>
  );
}

export default App;
