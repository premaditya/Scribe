import {useState} from "react";
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
// import About from "./components/About";
import Alert from "./components/Alert";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link
// } from 'react-router-dom'

function App() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (value) => {
    console.log("search Value:", value);
    setSearchValue(value);
  }
  const [alert, setAlert] = useState(null);
  const showAlert= (msg, type) =>{
      setAlert({
        message: msg,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 1000);
  }
  const [mode, setmode] = useState('light');
  const toggleMode = () =>{
    if(mode === 'light'){
      setmode('dark');
      document.body.style.backgroundColor = '#140e5c';
      document.body.classList.add("dark-mode");
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setmode('light');
      document.body.style.backgroundColor = 'white';
      document.body.classList.remove("dark-mode");
      showAlert("Light Mode has been enabled", "success")
    }
  }
  return (
    <>
      {/* <Router> */}
      <Navbar title="TextUtils" aboutText="About TextUtils" home="Home" onSearch={handleSearch} mode = {mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
        {/* <Routes> */}
          {/* <Route path="/" element={<TextForm showAlert={showAlert} heading = "Enter the Text to analyze below" searchValue={searchValue} mode={mode} />}/> */}
          {/* <Route path="/about" element={<About />}/>
        </Routes> */}
        <TextForm showAlert={showAlert} heading = "Enter the Text to analyze below" searchValue={searchValue} mode={mode} />
      </div>
      {/* </Router> */}
    </>
  );
}

export default App;
