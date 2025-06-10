import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-xl font-semibold text-white mb-4">Raju Travels</h3>
            <address className="not-italic space-y-2">
              <p className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-primary shrink-0" /> 
                Main Road, Near Jhanda Chowk, Hazaribagh, Jharkhand 825301
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" /> 
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <a href="mailto:info@rajutravels.com" className="hover:text-primary transition-colors">info@rajutravels.com</a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div>
             <h3 className="font-headline text-lg font-semibold text-white mb-4">Our Location</h3>
             <div className="bg-slate-700 rounded-md p-2 h-32 flex items-center justify-center">
                {/* Placeholder for map embed */}
                <p className="text-sm text-slate-400">Map Area (Google Maps Embed)</p>
                <Image src="https://placehold.co/300x150.png" alt="Map placeholder" width={300} height={150} className="rounded opacity-50" data-ai-hint="map city" />
             </div>
          </div>

        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Raju Travels - Hazaribagh. All Rights Reserved.</p>
          <p className="mt-1">Designed with ❤️ for easy travels.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
