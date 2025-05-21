
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { ChefHat, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Simulate fetching saved recipes from local storage
  useEffect(() => {
    setLoading(true);
    try {
      const savedRecipesData = localStorage.getItem('savedRecipes');
      if (savedRecipesData) {
        setSavedRecipes(JSON.parse(savedRecipesData));
      }
    } catch (error) {
      console.error('Error loading saved recipes:', error);
      toast({
        title: "Couldn't load saved recipes",
        description: "There was an error loading your saved recipes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Simulate adding a recipe to favorites for testing
  const addDemoRecipe = () => {
    const demoRecipe: Recipe = {
      id: Date.now().toString(),
      name: 'Saved Pasta Recipe',
      description: 'A recipe you saved earlier',
      cuisine: 'Italian',
      difficulty: 'Easy',
      prepTime: '10 mins',
      cookingTime: '20 mins',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
    };
    
    const updatedRecipes = [...savedRecipes, demoRecipe];
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    
    toast({
      title: "Recipe saved",
      description: "Demo recipe has been added to your collection.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Saved Recipes</h1>
          <Button onClick={addDemoRecipe} variant="outline">Add Demo Recipe</Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow animate-pulse">
                <div className="aspect-square bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : savedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No saved recipes yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              When you find recipes you love, save them here to build your personal cookbook.
            </p>
            <Button className="bg-chef-600 hover:bg-chef-700" onClick={() => window.location.href = '/'}>
              <BookOpen className="h-4 w-4 mr-2" />
              Find Recipes
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyRecipes;
