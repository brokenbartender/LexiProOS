import React, { useEffect, useState } from 'react';
import { Shield, Lock, KeyRound, Menu, X } from 'lucide-react';
import { clearGeminiApiKey, getGeminiApiKey, setGeminiApiKey } from '../services/apiKey';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    setHasKey(!!getGeminiApiKey());
  }, [isKeyModalOpen]);

  const saveKey = () => {
    if (!apiKeyInput.trim()) return;
    setGeminiApiKey(apiKeyInput);
    setApiKeyInput('');
    setHasKey(true);
    setIsKeyModalOpen(false);
  };

  const removeKey = () => {
    clearGeminiApiKey();
    setHasKey(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-serif font-bold tracking-wide text-white">
              LEXI<span className="text-blue-500">PRO</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#platform" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Platform</a>
            <a href="#matrix" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Evidence Matrix</a>
            <a href="#technology" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Technology</a>
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className={`flex items-center space-x-2 text-xs border px-3 py-1 rounded-full transition-colors hover:text-white ${hasKey ? 'border-green-500/40' : 'border-slate-700 hover:border-slate-500'}`}
            >
              <KeyRound className="h-3 w-3" />
              <span className={hasKey ? 'text-green-400' : 'text-slate-400'}>
                {hasKey ? 'API KEY SET' : 'SET API KEY'}
              </span>
            </button>
            <div className="flex items-center space-x-2 text-xs text-slate-500 border px-3 py-1 border-slate-700 rounded-full">
              <Lock className="h-3 w-3" />
              <span>STATIC DEMO (NO DATA STORED)</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-t border-slate-800 animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a 
              href="#platform" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Platform
            </a>
            <a 
              href="#matrix" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Evidence Matrix
            </a>
            <a 
              href="#technology" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              Technology
            </a>
            <div className="mt-4 px-3 flex items-center space-x-2 text-xs text-slate-500">
              <Lock className="h-3 w-3" />
              <span>STATIC DEMO (NO DATA STORED)</span>
            </div>

            <div className="mt-4 px-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsKeyModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md"
              >
                <span className="text-sm font-medium">Gemini API Key</span>
                <span className={hasKey ? 'text-green-400 text-xs font-mono' : 'text-slate-400 text-xs font-mono'}>
                  {hasKey ? 'SET' : 'REQUIRED'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
            onClick={() => setIsKeyModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
            <button
              onClick={() => setIsKeyModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif font-bold text-navy-900">Live Analysis Key</h3>
                <KeyRound className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                This is a <strong>static GitHub Pages demo</strong>. To run live Gemini analysis, paste your Gemini API key here.
                The key is stored <strong>only in your browser</strong> (localStorage) and is never uploaded anywhere.
              </p>

              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gemini API Key</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Paste key (kept local)"
                className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none transition-all hover:border-blue-400 focus:border-blue-600 font-mono text-sm"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveKey}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors shadow-lg active:scale-95 duration-200"
                >
                  Save Key
                </button>
                <button
                  onClick={removeKey}
                  className="flex-1 py-3 border border-slate-300 text-slate-700 font-bold rounded-sm hover:bg-slate-50 transition-colors active:scale-95 duration-200"
                  disabled={!hasKey}
                >
                  Clear Key
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Tip: get a Gemini API key from Google AI Studio. (Do not commit it to GitHub.)
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;