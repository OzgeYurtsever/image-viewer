import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import File from "./components/File";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Image Viewer</Navbar.Brand>
        </Container>
      </Navbar>
      <File />
    </div>

  );
}

export default App;
