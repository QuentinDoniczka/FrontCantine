import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home.tsx';
import Manage from './pages/Manage/Manage.tsx';
import Protected from './authorization/Protected.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/manage"
              element={
                <Protected>
                  <Manage />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
