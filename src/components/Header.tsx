
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-chef-700" />
          <span className="text-2xl font-bold text-chef-700">ChefMate<span className="text-tomato-700">AI</span></span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-foreground hover:text-chef-700 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-recipes" className="text-foreground hover:text-chef-700 font-medium">
                My Recipes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
