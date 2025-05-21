
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeHero from '@/components/HomeHero';
import RecipeChat from '@/components/RecipeChat';
import RecipeList from '@/components/RecipeList';
import { Recipe } from '@/types/recipe';
import { sampleRecipes } from '@/lib/sampleData';

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const focusOnChat = () => {
    setTimeout(() => {
      chatInputRef.current?.focus();
      window.scrollTo({
        top: chatInputRef.current?.getBoundingClientRect().top! + window.scrollY - 120,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleRecipeResults = (newRecipes: Recipe[]) => {
    if (newRecipes.length > 0) {
      setRecipes(prevRecipes => {
        // Merge new recipes with existing ones, avoiding duplicates by ID
        const existingIds = new Set(prevRecipes.map(r => r.id));
        const uniqueNewRecipes = newRecipes.filter(r => !existingIds.has(r.id));
        return [...uniqueNewRecipes, ...prevRecipes].slice(0, 20); // Keep the list manageable
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container">
          <HomeHero onChatFocus={focusOnChat} />
          
          <div className="py-8 space-y-10" id="recipe-chat">
            <div className="max-w-3xl mx-auto">
              <RecipeChat onResults={handleRecipeResults} ref={chatInputRef} />
            </div>
            
            <RecipeList recipes={recipes} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
