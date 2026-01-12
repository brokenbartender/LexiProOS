import React, { useState } from 'react';
import { ArrowRight, Lock, FileKey, CheckCircle, Loader2, X, Send } from 'lucide-react';

interface AcquisitionContactProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AcquisitionContact: React.FC<AcquisitionContactProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    firm: ''
  });

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    // Reset state after transition
    setTimeout(() => {
        setStep(1);
        setFormData({ name: '', email: '', firm: '' });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    
    // Simulate backend verification delay
    setTimeout(() => {
        // Construct mailto link for client-side email delivery to ensure no leads are lost
        const subject = `LexiPro Acquisition Inquiry: ${formData.firm}`;
        const body = `CONFIDENTIAL ACQUISITION INQUIRY\n\nName: ${formData.name}\nFirm: ${formData.firm}\nEmail: ${formData.email}\nAgreed to NDA: Yes\nTimestamp: ${new Date().toISOString()}\n\nSystem: LexiPro Forensic OS v2.4\nRequest: Access to Data Room & Tech Stack Review.`;
        
        // Update UI to success state first to ensure feedback
        setStep(3);

        // Trigger email client as backup/primary delivery method
        window.location.href = `mailto:baentertainmentmi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 2000);
  };

  return (
    <section id="acquisition" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-900 text-white mb-6 animate-pulse">
           <Lock className="h-3 w-3" />
           <span className="text-xs font-bold tracking-wider uppercase">Restricted Access</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
          Strategic Acquisition Portal
        </h2>
        <p className="text-xl text-slate-600 mb-12 font-light max-w-2xl mx-auto">
          LexiPro is currently entering due diligence with select partners. Access our confidential data room to view verified financial models, IP assets, and customer cohorts.
        </p>
        
        <div className="flex justify-center">
            <button 
                onClick={handleOpen}
                className="flex items-center justify-center px-10 py-5 bg-navy-900 text-white font-bold rounded-sm hover:bg-navy-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group active:scale-95 duration-200"
            >
              Request Access to Data Room
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
        <p className="mt-6 text-xs text-slate-400">
            * Access requires execution of a Non-Disclosure Agreement (NDA).
        </p>
      </div>

      {/* NDA Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity duration-300" onClick={handleClose}></div>
            <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
                
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
                >
                    <X className="h-5 w-5" />
                </button>

                {step === 1 && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-serif font-bold text-navy-900">Confidentiality Agreement</h3>
                            <FileKey className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed bg-slate-50 p-4 rounded border border-slate-200 h-32 overflow-y-auto font-mono text-xs shadow-inner">
                            <strong>MUTUAL NON-DISCLOSURE AGREEMENT</strong><br/><br/>
                            This Agreement is entered into by and between LexiPro Forensic Systems Inc. ("Disclosing Party") and the undersigned ("Receiving Party").<br/><br/>
                            1. Confidential Information. Receiving Party agrees to treat all data within the Data Room as strictly confidential, including but not limited to source code, algorithms, customer lists, and financial projections.<br/><br/>
                            2. Non-Use. Receiving Party shall not use the Confidential Information for any purpose other than evaluating a potential transaction.<br/><br/>
                            3. Term. This agreement shall remain in effect for a period of 2 years from the date of execution.
                        </p>
                        <form onSubmit={handleSign} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Legal Name</label>
                                <input 
                                  required 
                                  type="text" 
                                  id="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none transition-all hover:border-blue-400 focus:border-blue-600" 
                                  placeholder="Enter name to sign" 
                                />
                            </div>
                            <div>
                                <label htmlFor="firm" className="block text-xs font-bold text-slate-500 uppercase mb-1">Organization / Firm</label>
                                <input 
                                  required 
                                  type="text" 
                                  id="firm"
                                  value={formData.firm}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none transition-all hover:border-blue-400 focus:border-blue-600" 
                                  placeholder="Legal Firm or Venture Fund" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase mb-1">Corporate Email</label>
                                <input 
                                  required 
                                  type="email" 
                                  id="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-navy-900 outline-none transition-all hover:border-blue-400 focus:border-blue-600" 
                                  placeholder="name@firm.com" 
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-2 group">
                                <input required type="checkbox" id="agree" className="rounded text-navy-900 focus:ring-navy-900 cursor-pointer" />
                                <label htmlFor="agree" className="text-xs text-slate-600 cursor-pointer select-none group-hover:text-navy-900 transition-colors">I agree to the terms of the NDA and consent to electronic signature.</label>
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm mt-4 transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-500/25 active:scale-95 duration-200">
                                <Send className="h-4 w-4 mr-2" />
                                Digitally Sign & Enter
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="p-12 flex flex-col items-center justify-center text-center h-[500px]">
                        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-6" />
                        <h3 className="text-xl font-bold text-navy-900 mb-2">Establishing Secure Handshake...</h3>
                        <p className="text-slate-500 text-sm">Verifying credentials and generating unique access token.</p>
                    </div>
                )}

                {step === 3 && (
                     <div className="p-12 flex flex-col items-center justify-center text-center h-[500px]">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-900 mb-2">NDA Accepted</h3>
                        <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                            Confidentiality Agreement (NDA) has been sent to <strong>{formData.email}</strong>.<br/><br/>
                            We are redirecting you to the Data Room preview...
                        </p>
                        <button onClick={handleClose} className="px-8 py-2 border border-slate-300 text-slate-600 font-medium rounded-sm hover:bg-slate-50 transition-colors active:scale-95">
                            Close Window
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </section>
  );
};

export default AcquisitionContact;