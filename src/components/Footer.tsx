
import { ChefHat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ChefHat className="h-6 w-6 text-chef-700 mr-2" />
            <span className="text-lg font-bold text-chef-700">ChefMate<span className="text-tomato-700">AI</span></span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ChefMate AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
