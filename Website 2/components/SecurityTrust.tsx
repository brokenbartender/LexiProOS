import React from 'react';
import { Lock, FileCheck, Server, Shield } from 'lucide-react';

const SecurityTrust: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
          
          <div className="md:w-1/3">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">
              Enterprise-Grade Governance
            </h2>
            <p className="text-slate-600 leading-relaxed">
              LexiPro is architected for the strict compliance requirements of Tier-1 law firms and healthcare providers. We do not train models on client data.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="flex-shrink-0">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wide">HIPAA Compliant</h4>
                <p className="text-xs text-slate-500 mt-1">BAA ready architecture with audit trails.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wide">SOC 2 Type II</h4>
                <p className="text-xs text-slate-500 mt-1">Certified controls for security & availability.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="flex-shrink-0">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wide">AES-256 Encryption</h4>
                <p className="text-xs text-slate-500 mt-1">Data encrypted at rest and in transit.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="flex-shrink-0">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-900 text-sm uppercase tracking-wide">Air-Gapped Ready</h4>
                <p className="text-xs text-slate-500 mt-1">Deployable to private VPCs or on-prem.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecurityTrust;