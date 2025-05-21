
import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '@/types/recipe';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Cake, Carrot, Pizza, Sandwich, SlidersHorizontal, Clock } from 'lucide-react';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRecipes = activeFilter === 'all' 
    ? recipes 
    : recipes.filter(recipe => 
        recipe.cuisine?.toLowerCase() === activeFilter || 
        recipe.category?.toLowerCase() === activeFilter
      );

  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">No recipes found</h3>
        <p className="text-muted-foreground">Try asking for some recipes in the chat above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recipe Suggestions</h2>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 flex flex-nowrap overflow-x-auto hide-scrollbar pb-1">
          <TabsTrigger value="all" onClick={() => setActiveFilter('all')}>All</TabsTrigger>
          <TabsTrigger value="quick" onClick={() => setActiveFilter('quick')}>
            <Clock className="h-4 w-4 mr-1.5" />
            Quick & Easy
          </TabsTrigger>
          <TabsTrigger value="vegetarian" onClick={() => setActiveFilter('vegetarian')}>
            <Carrot className="h-4 w-4 mr-1.5" />
            Vegetarian
          </TabsTrigger>
          <TabsTrigger value="dessert" onClick={() => setActiveFilter('dessert')}>
            <Cake className="h-4 w-4 mr-1.5" />
            Dessert
          </TabsTrigger>
          <TabsTrigger value="italian" onClick={() => setActiveFilter('italian')}>
            <Pizza className="h-4 w-4 mr-1.5" />
            Italian
          </TabsTrigger>
          <TabsTrigger value="breakfast" onClick={() => setActiveFilter('breakfast')}>
            <Sandwich className="h-4 w-4 mr-1.5" />
            Breakfast
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
        
        {/* The other tabs content will be shown based on the filtered data */}
        {['quick', 'vegetarian', 'dessert', 'italian', 'breakfast'].map(filter => (
          <TabsContent key={filter} value={filter} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RecipeList;
