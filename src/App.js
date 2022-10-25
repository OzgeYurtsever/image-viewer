import './App.css';
import ViewPort from "./components/ViewPort";

function App() {
  return (
    <div className="App">
      <div id="dicomImage"> </div>
      <div id="myCustomLoader"> </div>
      <ViewPort />
    </div>
  );
}

export default App;
