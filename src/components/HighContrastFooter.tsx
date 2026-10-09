import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ArrowUp, Cloud } from 'lucide-react';

interface HighContrastFooterProps {
  onNavigateToCloud: () => void;
}

export const HighContrastFooter: React.FC<HighContrastFooterProps> = ({ onNavigateToCloud }) => {
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1C3A29] bg-[#0E2418] text-[#F5F2EB] py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Col 1: Brand & Project Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="font-serif text-2xl font-medium tracking-tight text-[#FAF7F0]">
              Batch 12 / ProteoCloud
            </div>
            <p className="font-reading text-xs sm:text-sm leading-relaxed text-[#B7C2B9] max-w-sm">
              An intuitive platform for exploring 3D biological molecules, checking heart electrical rhythms, and connecting cloud storage solutions.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8CA091] space-y-1">
              <div>Project Release: Batch 12</div>
              <div className="flex items-center gap-1.5 text-[#C4A87C] pt-1">
                <Cloud className="h-3.5 w-3.5" />
                <span>Cloud Storage: Ready for Configuration</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={onNavigateToCloud}
                className="px-4 py-2 text-xs font-medium bg-[#1F4C34] text-[#FAF7F0] hover:bg-[#286043] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Cloud className="h-3.5 w-3.5" />
                <span>Configure Cloud Storage</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation & Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C4A87C]">
              Platform Navigation
            </h4>

            <ul className="space-y-2.5 font-sans text-[#CBD6CE]">
              <li>
                <a href="#biophysics" className="hover:text-white transition-colors">
                  &bull; 3D Molecular Structures
                </a>
              </li>
              <li>
                <a href="#electrophysiology" className="hover:text-white transition-colors">
                  &bull; Heart Rhythm Simulator
                </a>
              </li>
              <li>
                <a href="#cluster" className="hover:text-white transition-colors">
                  &bull; Cloud Processing Tasks
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToCloud}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  &bull; Cloud Storage &amp; GitHub
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: General Inquiry Form */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#C4A87C]">
              General Inquiries
            </h4>
            <p className="font-reading text-xs text-[#A9B8AC]">
              Leave a note, suggestion, or question regarding this project:
            </p>

            {isSubmitted ? (
              <div className="border border-[#2C6242] bg-[#143522] p-3 text-xs text-[#A7F3D0] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Thank you. Your message has been received.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-[#142E20] border border-[#234B34] px-2.5 py-1.5 text-xs text-[#FAF7F0] placeholder-[#738C7A] focus:border-[#C4A87C] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full bg-[#142E20] border border-[#234B34] px-2.5 py-1.5 text-xs text-[#FAF7F0] placeholder-[#738C7A] focus:border-[#C4A87C] focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Inquiry or message..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full bg-[#142E20] border border-[#234B34] px-2.5 py-1.5 text-xs text-[#FAF7F0] placeholder-[#738C7A] focus:border-[#C4A87C] focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1F4C34] hover:bg-[#286043] text-[#FAF7F0] text-xs font-medium transition-colors cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Hairline */}
        <div className="mt-10 pt-5 border-t border-[#1C3A29] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8CA091] font-mono">
          <div>
            &copy; 2026 ProteoCloud · Batch 12 · All Rights Reserved.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#C4A87C] hover:text-[#FAF7F0] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
