import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, FileText, AlertTriangle, ArrowRight, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

const LOG_STEPS = [
  { text: "> INITIALIZING AGENT: DEPOSITION_PREP_V3", color: "text-blue-400" },
  { text: "> CONNECTING TO CASE MATRIX...", color: "text-slate-400" },
  { text: "> INGESTING EVIDENCE ITEM: EV-004 (Dr. Smith Depo)", color: "text-yellow-400" },
  { text: "> CROSS-REFERENCING WITH: EV-001 (Nursing Notes)", color: "text-yellow-400" },
  { text: "> DETECTING TEMPORAL ANOMALY...", color: "text-red-400 animate-pulse" },
  { text: "> ALERT: TIMESTAMPS DO NOT MATCH (-45min variance)", color: "text-red-400" },
  { text: "> RETRIEVING STATUTE: Standard of Care (217.11)", color: "text-purple-400" },
  { text: "> DRAFTING IMPEACHMENT STRATEGY...", color: "text-green-400" },
  { text: "> MEMO GENERATION COMPLETE.", color: "text-green-400 font-bold" },
];

const AgenticWorkflow: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < LOG_STEPS.length ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Side */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
              <Cpu className="h-3 w-3 text-blue-600" />
              <span className="text-blue-700 text-xs font-bold tracking-wider uppercase">Live Demo: Agentic Loop</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-6">
              Autonomous Legal Reasoning.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              LexiPro's background agents don't just search; they <strong>think</strong>. The system autonomously monitors the evidentiary matrix 24/7, flagging contradictions between testimony and clinical data before your associates even open the file.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start group">
                <div className="flex-shrink-0 bg-white border border-slate-200 p-1.5 rounded-full mt-1 group-hover:border-blue-500 transition-colors shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <span className="ml-3 text-slate-700 font-medium">Detects temporal inconsistencies in EHR timestamps.</span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 bg-white border border-slate-200 p-1.5 rounded-full mt-1 group-hover:border-blue-500 transition-colors shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <span className="ml-3 text-slate-700 font-medium">Flags missing standard-of-care protocols instantly.</span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 bg-white border border-slate-200 p-1.5 rounded-full mt-1 group-hover:border-blue-500 transition-colors shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <span className="ml-3 text-slate-700 font-medium">Drafts cross-examination questions for associates.</span>
              </li>
            </ul>
          </div>

          {/* UI Mockup Side - Terminal Animation */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-navy-900 rounded-lg shadow-2xl border border-slate-700 overflow-hidden relative">
              {/* Fake Window Header */}
              <div className="bg-navy-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">agent_execution_log.sh</span>
                </div>
                <div className="flex space-x-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
              </div>

              {/* Terminal Interface */}
              <div className="p-6 h-[320px] overflow-hidden font-mono text-xs leading-loose bg-navy-950/50">
                 {LOG_STEPS.slice(0, logIndex).map((log, idx) => (
                    <div key={idx} className={`${log.color} mb-1 animate-fade-in-up`}>
                        {log.text}
                    </div>
                 ))}
                 {logIndex < LOG_STEPS.length && (
                     <div className="inline-block w-2 h-4 bg-slate-500 animate-pulse ml-1 align-middle"></div>
                 )}

                 {logIndex >= LOG_STEPS.length && (
                    <div className="mt-6 p-4 bg-slate-800/50 rounded border border-slate-700 animate-fade-in-up">
                        <div className="flex items-center space-x-2 mb-2">
                            <Bot className="h-4 w-4 text-blue-400" />
                            <span className="text-blue-300 font-bold uppercase">Action Required</span>
                        </div>
                        <p className="text-slate-300">
                           Drafted Memo: "Impeachment of Dr. Smith regarding Break Room Timeline". 
                           <span className="block mt-2 text-slate-500 italic">Ready for partner review.</span>
                        </p>
                    </div>
                 )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgenticWorkflow;