import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Configurator from './pages/Configurator';
import Print from './pages/Print';
import Community from './pages/Community';
import './App.css';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-white font-sans'>
      <Header />

      <main className='flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4'>
        <Routes>
          <Route path="/" element={<Configurator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;