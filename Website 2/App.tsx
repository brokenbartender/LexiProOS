import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EvidenceMatrix from './components/EvidenceMatrix';
import AgenticWorkflow from './components/AgenticWorkflow';
import StrategicAdvantage from './components/StrategicAdvantage';
import TechSpecs from './components/TechSpecs';
import SecurityTrust from './components/SecurityTrust';
import AcquisitionContact from './components/AcquisitionContact';
import Footer from './components/Footer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <EvidenceMatrix />
        <AgenticWorkflow />
        <StrategicAdvantage />
        <TechSpecs />
        <SecurityTrust />
        <AcquisitionContact isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </main>
      <Footer />
    </div>
  );
}

export default App;