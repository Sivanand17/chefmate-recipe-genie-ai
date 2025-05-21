
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, Soup } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="recipe-card h-full flex flex-col overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
            alt={recipe.name} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {recipe.cuisine || 'Mixed'}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4 flex-grow">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{recipe.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{recipe.description}</p>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{recipe.cookingTime || '30 mins'}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <ChefHat className="h-3.5 w-3.5 mr-1" />
            <span>{recipe.difficulty || 'Medium'}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
