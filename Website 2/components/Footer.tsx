import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-serif font-bold text-white">LEXI<span className="text-blue-500">PRO</span></span>
          <p className="text-slate-500 text-xs mt-1">© 2025 LexiPro Forensic Systems Inc.</p>
        </div>
        <div className="flex space-x-8 text-sm text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;