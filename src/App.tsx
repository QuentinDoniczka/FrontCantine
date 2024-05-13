import './App.css'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home/Home.tsx";
const App = () => {

  return (
      <div className="App">
          <Header />
          <Home />
          <Footer />
      </div>
  )
}

export default App
