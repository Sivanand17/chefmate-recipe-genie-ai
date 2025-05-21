
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

interface HomeHeroProps {
  onChatFocus: () => void;
}

const HomeHero = ({ onChatFocus }: HomeHeroProps) => {
  return (
    <div className="py-12 md:py-20 flex flex-col items-center text-center">
      <div className="inline-flex items-center justify-center p-3 bg-chef-100 rounded-full mb-6">
        <ChefHat className="h-8 w-8 text-chef-700" />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
        Find Perfect Recipes with <span className="text-chef-700">Chef</span><span className="text-tomato-700">Mate AI</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        Tell us what ingredients you have or what you're craving, and we'll suggest the perfect recipe for you!
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button size="lg" className="bg-chef-600 hover:bg-chef-700" onClick={onChatFocus}>
          Start Cooking
        </Button>
        <Button size="lg" variant="outline">
          Browse Popular Recipes
        </Button>
      </div>
    </div>
  );
};

export default HomeHero;
