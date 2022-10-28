import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import File from "./components/File";

function App() {
  localStorage.setItem('dataURLs', JSON.stringify([[]]));
  localStorage.setItem('measurements', JSON.stringify([[]]));
  return (
    <div>
      <File />
    </div>

  );
}

export default App;
