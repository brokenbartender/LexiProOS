import React from 'react';
import { Box, ShieldCheck, Database, Server, Lock, Anchor, Container, FileKey } from 'lucide-react';

const TechSpecs: React.FC = () => {
  return (
    <section id="technology" className="py-24 bg-navy-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Technical Moat</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built for security, speed, and massive scale. LexiPro is not a wrapper—it is a full-stack forensic operating system.
          </p>
        </div>

        {/* 3-Column Core Moat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Moat 1: Forensic Anchoring */}
            <div className="bg-slate-800/30 border border-slate-700 p-8 rounded-sm hover:bg-slate-800/50 transition-all group">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Anchor className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Forensic Anchoring™</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Zero-Hallucination Architecture. Every AI insight is cryptographically anchored to a specific line item in the raw evidence, providing an auditable chain of custody for court.
                </p>
            </div>

            {/* Moat 2: Docker Native */}
            <div className="bg-slate-800/30 border border-slate-700 p-8 rounded-sm hover:bg-slate-800/50 transition-all group">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Container className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Docker-Native Deploy</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Pre-packaged container orchestration allows for one-click on-premise deployment. Keep data within your firm's firewall or private VPC. No data egress required.
                </p>
            </div>

            {/* Moat 3: Compliance */}
            <div className="bg-slate-800/30 border border-slate-700 p-8 rounded-sm hover:bg-slate-800/50 transition-all group">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">HIPAA & SOC 2 Ready</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Enterprise governance built-in. Role-based access control (RBAC), audit logging, and AES-256 encryption at rest meet the strictest BigLaw compliance standards.
                </p>
            </div>
        </div>

        {/* Integration Ecosystem */}
        <div className="border-t border-slate-800 pt-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Seamless Integration Ecosystem</h3>
                    <p className="text-slate-400 text-sm">LexiPro runs headless within your existing stack.</p>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                    {['Relativity', 'Clio', 'iManage', 'NetDocuments', 'Everlaw'].map((partner) => (
                        <div key={partner} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-400 text-sm font-semibold tracking-wide uppercase">
                        {partner}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;