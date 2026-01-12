import React from 'react';
import { TrendingDown, Eye, ShieldCheck } from 'lucide-react';

const StrategicAdvantage: React.FC = () => {
  return (
    <section className="py-24 bg-navy-900 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-2 block">Performance Metrics</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Measurable Strategic Advantage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-sm hover:border-blue-500/50 transition-colors group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors">
                <TrendingDown className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Discovery Velocity</h3>
            </div>
            <div className="text-5xl font-mono font-bold text-white mb-2">85%</div>
            <p className="text-slate-400 text-sm">Reduction in initial discovery time versus manual associate review.</p>
          </div>

          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-sm hover:border-blue-500/50 transition-colors group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Forensic Surveillance</h3>
            </div>
            <div className="text-5xl font-mono font-bold text-white mb-2">24/7</div>
            <p className="text-slate-400 text-sm">Continuous monitoring of ingested case files for new correlation patterns.</p>
          </div>

          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-sm hover:border-blue-500/50 transition-colors group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-green-900/30 rounded-lg group-hover:bg-green-900/50 transition-colors">
                <ShieldCheck className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Accuracy Rate</h3>
            </div>
            <div className="text-5xl font-mono font-bold text-white mb-2">0.0%</div>
            <p className="text-slate-400 text-sm">LLM Hallucination Rate via proprietary Forensic Anchoring™ verification.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicAdvantage;