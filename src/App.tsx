import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'
import './index.css'

function App() {


  return (
    <>
      <div className='min-h-screen flex flex-col bg-white font-sans'>
        <Header />
        <main className='flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4'>
        </main>
        <Footer />
      </div>

    </>
  )
}

export default App
