import { Blocks } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2447] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Blocks className="h-6 w-6 text-[#A5D7E8]" />
              <span className="text-lg font-bold">BlockService</span>
            </div>
            <p className="text-gray-300">Building the future of finance and Web3 technology.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Smart Contracts</li>
              <li>DeFi Solutions</li>
              <li>Security Audits</li>
              <li>Consulting</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>contact@blockservice.dev</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Blockchain Street</li>
              <li>San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} BlockService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}