
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Utensils, ArrowLeft, PrinterIcon, Bookmark, Share2 } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { getRecipeById } from '@/lib/ai';
import { sampleRecipes } from '@/lib/sampleData';
import { useToast } from '@/components/ui/use-toast';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // Try to get the recipe from the AI service
        const fetchedRecipe = await getRecipeById(id!);
        setRecipe(fetchedRecipe);
        
        // Check if recipe is saved
        try {
          const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
          setIsSaved(savedRecipes.some((r: Recipe) => r.id === id));
        } catch (error) {
          console.error('Error checking saved status:', error);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        
        // Fallback to sample recipes if API call fails
        const sampleRecipe = sampleRecipes.find(r => r.id === id);
        if (sampleRecipe) {
          setRecipe(sampleRecipe);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);

  const toggleSaveRecipe = () => {
    if (!recipe) return;
    
    try {
      const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
      
      if (isSaved) {
        // Remove from saved recipes
        const updatedRecipes = savedRecipes.filter((r: Recipe) => r.id !== recipe.id);
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        setIsSaved(false);
        toast({
          title: "Recipe removed",
          description: `"${recipe.name}" has been removed from your saved recipes.`,
        });
      } else {
        // Add to saved recipes
        const updatedRecipes = [...savedRecipes, recipe];
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        setIsSaved(true);
        toast({
          title: "Recipe saved",
          description: `"${recipe.name}" has been added to your saved recipes.`,
        });
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast({
        title: "Couldn't save recipe",
        description: "There was an error saving this recipe.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-3/4 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find the recipe you're looking for.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to recipes
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1 lg:max-w-[60%]">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.cuisine && <Badge variant="outline">{recipe.cuisine}</Badge>}
              {recipe.category && <Badge variant="outline">{recipe.category}</Badge>}
              <Badge variant="outline" className="bg-chef-50 text-chef-700 border-chef-200">
                {recipe.difficulty || 'Medium'}
              </Badge>
            </div>
            
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img 
                src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
                alt={recipe.name} 
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Prep Time</span>
                <span className="font-medium">{recipe.prepTime || '15 mins'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Utensils className="h-5 w-5 mb-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cook Time</span>
                <span className="font-medium">{recipe.cookingTime || '30 mins'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <ChefHat className="h-5 w-5 mb-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Servings</span>
                <span className="font-medium">{recipe.servings || '4'}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About this recipe</h2>
              <p className="text-muted-foreground">{recipe.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions?.map((step, index) => (
                  <li key={index} className="pl-6 relative">
                    <span className="absolute left-0 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-chef-600 text-white text-xs">
                      {index + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                )) || (
                  <p className="text-muted-foreground">No instructions available.</p>
                )}
              </ol>
            </div>
          </div>
          
          <div className="lg:flex-1">
            <div className="sticky top-[100px]">
              <div className="bg-muted p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <Separator className="mb-4" />
                <ul className="space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <input type="checkbox" id={`ingredient-${index}`} className="mr-2" />
                      <label htmlFor={`ingredient-${index}`} className="text-muted-foreground">
                        {ingredient}
                      </label>
                    </li>
                  )) || (
                    <p className="text-muted-foreground">No ingredients available.</p>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex-1">
                  <PrinterIcon className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button 
                  variant={isSaved ? "default" : "outline"} 
                  className={`flex-1 ${isSaved ? 'bg-chef-600 hover:bg-chef-700' : ''}`}
                  onClick={toggleSaveRecipe}
                >
                  <Bookmark className="mr-2 h-4 w-4" /> {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetails;
