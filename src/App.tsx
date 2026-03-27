import Header from './components/Header'
import Footer from './components/Footer'
import IngredientSection from './components/IngredientSection'
import SummaryBar from './components/SummaryBar'
import Configurator from './pages/Configurator'
import Print from './pages/Print'
import Community from './pages/Community'
import './App.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-white font-sans'>
      <Header />a

      <main className='flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4'>
      
        <Configurator />

        <IngredientSection />

        <SummaryBar />

      </main>
      <Community />
      <Print /> 
      <Footer />
    </div>
  )
}

export default App