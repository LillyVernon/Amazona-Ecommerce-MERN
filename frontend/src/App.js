import { Link } from 'react-router-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <header className="App-header">
        <Link to="/"> amazona</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen/>} />
          <Route path='/' element={<HomeScreen/>}/>
        </Routes>
    
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
