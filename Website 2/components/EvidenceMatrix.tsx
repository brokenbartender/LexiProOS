import React, { useState, useEffect } from 'react';
import { FileText, Mail, Stethoscope, AlertCircle, ScanLine, Loader2, X, BrainCircuit, Scale, ChevronRight, UserCheck, Terminal, Check, Anchor, Plus, UploadCloud } from 'lucide-react';
import { EvidenceItem, AnalysisResult } from '../types';
import { analyzeEvidence } from '../services/geminiService';

// Initial seed data (now stateful)
const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'EV-001',
    title: 'Nursing Notes - Night Shift',
    type: 'Medical Record',
    timestamp: '2023-10-12 02:15 AM',
    content: 'Patient complaining of severe abdominal pain (8/10). Dr. Smith paged twice. No response. Administered 500mg Acetaminophen per standing order. Vitals: BP 90/60, HR 115.',
    riskScore: 9
  },
  {
    id: 'EV-002',
    title: 'Internal Email Chain',
    type: 'Email',
    timestamp: '2023-10-12 09:30 AM',
    content: 'Subject: RE: Incident Report. Let\'s keep this off the main channel until we speak with legal. The staffing ratio was definitely below protocol last night.',
    riskScore: 10
  },
  {
    id: 'EV-004',
    title: 'Deposition: Dr. Smith',
    type: 'Deposition',
    timestamp: '2024-02-15',
    content: 'Q: Did you receive the page at 2:15 AM? A: I do not recall receiving a page. My pager battery may have been dead, but I was in the break room.',
    riskScore: 7
  },
];

// Helper component for Typing Effect
const TypewriterText = ({ text, delay = 10, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    if (!text) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [text, delay, onComplete]);

  return <span>{displayedText}</span>;
};

const EvidenceMatrix: React.FC = () => {
  // State
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [markStatus, setMarkStatus] = useState<'idle' | 'done'>('idle');
  
  // Ingestion State
  const [ingestContent, setIngestContent] = useState('');
  const [ingestType, setIngestType] = useState<EvidenceItem['type']>('Medical Record');

  // Trigger analysis when a node is selected
  const handleSelect = async (item: EvidenceItem) => {
    setSelectedEvidence(item);
    setAnalysis(null);
    setLoading(true);
    setIsVerified(false);
    setExportStatus('idle');
    setMarkStatus('idle');
    
    try {
        // LIVE API CALL
        const result = await analyzeEvidence(item);
        setAnalysis(result);
    } catch (e) {
        console.error("Analysis failed", e);
    } finally {
        setLoading(false);
    }
  };

  const closePanel = () => {
    setSelectedEvidence(null);
    setAnalysis(null);
  };

  const handleIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingestContent.trim()) return;

    const newItem: EvidenceItem = {
      id: `EV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: `Ingested ${ingestType}`,
      type: ingestType,
      timestamp: new Date().toLocaleString(),
      content: ingestContent,
      riskScore: 5 // Default, would be calculated by AI in a full version
    };

    setEvidenceList([newItem, ...evidenceList]);
    setIngestContent('');
    // Auto-select the new item to trigger immediate analysis
    handleSelect(newItem);
  };

  const getIcon = (type: EvidenceItem['type']) => {
    switch (type) {
      case 'Medical Record': return <FileText className="h-5 w-5" />;
      case 'Email': return <Mail className="h-5 w-5" />;
      case 'Deposition': return <Stethoscope className="h-5 w-5" />;
      case 'Lab Result': return <ScanLine className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'bg-red-500/20 text-red-400 border-red-500/50';
    if (score >= 5) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-green-500/20 text-green-400 border-green-500/50';
  };

  const renderSidebarContent = () => {
    if (!selectedEvidence) return null;

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Original Source */}
            <div className="bg-navy-950 p-4 rounded border border-slate-800 font-mono text-xs text-slate-300 relative">
               <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/50">
                  <div className="flex items-center space-x-2">
                      <Anchor className="h-3 w-3 text-blue-500" />
                      <span className="text-blue-500 font-bold uppercase tracking-wider">Forensic Anchor</span>
                  </div>
                  <span className="text-slate-600">ID: {selectedEvidence.id}</span>
               </div>
               <p className="leading-relaxed opacity-90">
                 "{selectedEvidence.content}"
               </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <div className="text-center">
                  <p className="text-slate-300 text-sm font-medium">Querying Gemini 3 Pro Neural Network</p>
                  <p className="text-slate-500 text-xs mt-1">Generating chain-of-thought analysis...</p>
                </div>
              </div>
            ) : (
              analysis && (
                <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Analysis Summary */}
                  <div className="relative">
                     <div className="absolute -left-6 top-1 w-1 h-6 bg-blue-500 rounded-r"></div>
                     <h4 className="flex items-center text-sm font-bold text-white mb-3 tracking-wide uppercase">
                       <FileText className="h-4 w-4 mr-2 text-blue-500" />
                       Forensic Summary
                     </h4>
                     <p className="text-slate-300 text-sm leading-relaxed">
                       <TypewriterText text={analysis.summary} delay={15} />
                     </p>
                  </div>

                  {/* Liability - Highlighted */}
                  <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-sm">
                    <h4 className="flex items-center text-sm font-bold text-red-200 mb-2 tracking-wide uppercase">
                      <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                      Risk Assessment
                    </h4>
                    <p className="text-red-100 text-sm leading-relaxed font-medium">
                       <TypewriterText text={analysis.liability} delay={25} />
                    </p>
                  </div>

                  {/* Chain of Thought */}
                  <div>
                    <h4 className="flex items-center text-sm font-bold text-white mb-3 tracking-wide uppercase">
                      <BrainCircuit className="h-4 w-4 mr-2 text-purple-400" />
                      AI Reasoning (Chain-of-Thought)
                    </h4>
                    <div className="text-slate-300 text-sm leading-relaxed font-mono text-xs bg-slate-800/50 p-4 rounded border border-slate-700">
                       <span className="text-purple-400 block mb-2">{">"} ANALYZING CAUSATION...</span>
                       <TypewriterText text={analysis.reasoning} delay={10} />
                    </div>
                  </div>

                  {/* Statutes */}
                  <div>
                    <h4 className="flex items-center text-sm font-bold text-white mb-3 tracking-wide uppercase">
                      <Scale className="h-4 w-4 mr-2 text-yellow-500" />
                      Statute Correlation
                    </h4>
                    <ul className="space-y-2">
                      {analysis.statutes.map((statute, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-300 group cursor-default">
                          <ChevronRight className="h-4 w-4 text-slate-600 mt-0.5 mr-2 group-hover:text-yellow-500 transition-colors" />
                          <span className="group-hover:text-white transition-colors border-b border-transparent group-hover:border-slate-500">
                             {statute}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audit Trail Mockup */}
                  <div className="mt-8 pt-6 border-t border-slate-800">
                      <h4 className="flex items-center text-xs font-bold text-slate-500 mb-3 uppercase tracking-wide">
                        <Terminal className="h-3 w-3 mr-2" />
                        System Audit Log
                      </h4>
                      <div className="bg-black/30 p-3 rounded font-mono text-[10px] text-slate-500 space-y-1">
                          <div className="flex justify-between">
                             <span>14:22:10 - Ingested Node {selectedEvidence.id}</span>
                             <span className="text-green-900">OK</span>
                          </div>
                          <div className="flex justify-between">
                             <span>14:22:18 - Gemini 3 Pro Inference Complete</span>
                             <span className="text-green-900">OK</span>
                          </div>
                      </div>
                  </div>

                </div>
              )
            )}
        </div>
    );
  };

  return (
    <section id="matrix" className="py-24 bg-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Ingestion Hub */}
        <div className="mb-12 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Unified Evidence Matrix™</h2>
            <p className="text-slate-400 max-w-2xl">
                Ingest case files and trigger immediate forensic analysis by Gemini 3 Pro.
            </p>
          </div>

          {/* Unified Ingestion Hub UI */}
          <div className="bg-navy-900 border border-slate-700 p-6 rounded-sm shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
                <UploadCloud className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Unified Ingestion Hub</h3>
            </div>
            <form onSubmit={handleIngest} className="flex flex-col md:flex-row gap-4">
                <select 
                    value={ingestType}
                    onChange={(e) => setIngestType(e.target.value as EvidenceItem['type'])}
                    className="bg-slate-800 border border-slate-600 text-slate-300 text-sm rounded px-3 py-3 outline-none focus:border-blue-500"
                >
                    <option value="Medical Record">Medical Record</option>
                    <option value="Email">Email Communication</option>
                    <option value="Deposition">Deposition Transcript</option>
                    <option value="Lab Result">Lab Result</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Paste evidence snippet content here (e.g., 'Nurse noted bradycardia but did not page...')"
                    value={ingestContent}
                    onChange={(e) => setIngestContent(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded px-4 py-3 outline-none focus:border-blue-500 placeholder-slate-500 font-mono"
                />
                <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded flex items-center justify-center transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Ingest & Analyze
                </button>
            </form>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {evidenceList.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`group relative p-4 md:p-6 bg-navy-900 border border-slate-700 hover:border-blue-500 transition-all duration-300 cursor-pointer rounded-sm hover:shadow-2xl hover:shadow-blue-900/20 active:scale-98 ${selectedEvidence?.id === item.id ? 'ring-2 ring-blue-500 border-transparent' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-md bg-slate-800 text-slate-300 group-hover:text-blue-400 group-hover:bg-blue-900/30 transition-colors`}>
                  {getIcon(item.type)}
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded border ${getRiskColor(item.riskScore)}`}>
                  RISK: {item.riskScore}/10
                </span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-3 mb-4 font-mono text-xs leading-relaxed opacity-70">
                {item.content}
              </p>
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-800 pt-3">
                <span>ID: {item.id}</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-over Analysis Panel */}
      {selectedEvidence && (
        <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out p-0 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-navy-900/50 backdrop-blur-sm">
             <div>
               <div className="flex items-center space-x-2 mb-2">
                 <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                 <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">Live Forensic Session</span>
               </div>
               <h3 className="text-xl font-serif font-bold text-white">{selectedEvidence.title}</h3>
               <p className="text-xs text-slate-500 font-mono mt-1">
                 REF: {selectedEvidence.id} | {selectedEvidence.timestamp}
               </p>
             </div>
             
             <div className="flex items-center space-x-4">
                 <button 
                    onClick={() => setIsVerified(!isVerified)}
                    className={`cursor-pointer flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all select-none hover:bg-slate-700/50 ${isVerified ? 'bg-green-900/30 border-green-500/50 text-green-400' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'}`}
                 >
                     <UserCheck className="h-4 w-4" />
                     <span className="text-xs font-bold uppercase">{isVerified ? 'Verified' : 'Verify'}</span>
                 </button>
                 
                 <button 
                    onClick={closePanel}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-sm transition-colors"
                  >
                    <X className="h-5 w-5" />
                 </button>
             </div>
          </div>

          {renderSidebarContent()}

          {/* Action Footer */}
          <div className="p-6 border-t border-slate-800 bg-navy-900 z-10">
             <div className="flex space-x-4">
                <button 
                  onClick={() => {
                      setExportStatus('loading');
                      setTimeout(() => setExportStatus('done'), 1500);
                  }}
                  disabled={exportStatus !== 'idle'}
                  className={`flex-1 py-3 flex items-center justify-center font-medium rounded-sm transition-all text-sm shadow-lg shadow-blue-900/20 active:scale-98 ${exportStatus === 'done' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {exportStatus === 'loading' && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {exportStatus === 'done' && <Check className="h-4 w-4 mr-2" />}
                    {exportStatus === 'idle' ? 'Export Analysis' : exportStatus === 'done' ? 'Exported' : 'Generating...'}
                </button>
                <button 
                    onClick={() => setMarkStatus('done')}
                    disabled={markStatus === 'done'}
                    className={`flex-1 py-3 border rounded-sm transition-colors text-sm active:scale-98 ${markStatus === 'done' ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-transparent border-slate-600 text-slate-300 hover:text-white hover:border-slate-400'}`}
                >
                    {markStatus === 'done' ? 'Marked' : 'Mark for Discovery'}
                </button>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EvidenceMatrix;