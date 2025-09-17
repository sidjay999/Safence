import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <div className="w-full h-13 bg-sentinel-bg border-t border-sentinel-border">
      <div className="flex items-center justify-between px-44 py-4">
        {/* Left side navigation */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-sentinel-text text-sm font-medium hover:text-white transition-colors">
            Product
          </a>
          <a href="#" className="text-sentinel-text text-sm font-medium hover:text-white transition-colors">
            Resources
          </a>
          <a href="#" className="text-sentinel-text text-sm font-medium hover:text-white transition-colors">
            Company
          </a>
        </div>

        {/* Right side social media */}
        <div className="flex items-center gap-11">
          <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-sentinel-text opacity-80 hover:opacity-100 transition-opacity">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
