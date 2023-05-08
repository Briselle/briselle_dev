import './App.css';
import {Routes,Route} from 'react-router-dom';
import FormDetails from './components/FormDetails';
import DisplayObjects from './components/DisplayObjects';
import CreateObject from './components/CreateObject';
import CreateFields from './components/CreateFields';
import DisplayFields from './components/DisplayFields';
import DisplayValues from './components/DisplayValues';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import DisplaySetup from './components/DisplaySetup';

function App() {
  return (
    <div className='app'>    
    <Navbar/>  
    <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/create_objects" element={<CreateObject/>}></Route>
        <Route path="/create_fields" element={<CreateFields />}></Route>
        <Route exact path="/display_fields/:objectId" element={<DisplayFields />}></Route>
        <Route path="/display_objects" element={<DisplayObjects />}></Route>
        <Route path="/display_values" element={<DisplayValues />}></Route>
        <Route path="/load_form" element={<FormDetails/>}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/display_setup" element={<DisplaySetup />}></Route>
      </Routes>
      </div>
  );
}

export default App;
