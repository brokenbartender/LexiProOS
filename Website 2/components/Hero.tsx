import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section id="platform" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 mb-8 animate-fade-in-up">
            <Activity className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">System Operational v2.4.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
            The First Vertical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">
              Forensic OS
            </span> for <br />
            Medical Liability.
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
            LexiPro automates the discovery phase of complex medical malpractice litigation. 
            Unified ingestion of EHR data, depositions, and communications—analyzed instantly by Gemini 3 Pro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenModal}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-sm text-white bg-blue-700 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 duration-200"
            >
              Request Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a 
              href="#technology" 
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-base font-medium rounded-sm text-slate-300 hover:text-white hover:border-slate-400 transition-all bg-transparent active:scale-95 duration-200"
            >
              View Technical Architecture
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;