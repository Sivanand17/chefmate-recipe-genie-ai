
import { Recipe } from '@/types/recipe';
import { sampleRecipes } from './sampleData';

export async function getRecipeRecommendations(query: string): Promise<{ message: string; recipes: Recipe[] }> {
  console.log('Searching for recipes with query:', query);
  
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract ingredients from the query
  const lowerQuery = query.toLowerCase();
  
  // Look for ingredients patterns like "I have X, Y, Z" or just comma-separated lists
  const ingredientsMatch = 
    lowerQuery.match(/(?:i have|ingredients:|with|using)(?:\s+the)?(?:\s+ingredients)?[\s:]*([\w\s,]+)/) || 
    lowerQuery.split(/[,.]/).filter(item => 
      !item.includes('recipe') && 
      !item.includes('make') && 
      item.trim().length > 0
    );
  
  let ingredients: string[] = [];
  
  if (ingredientsMatch) {
    if (Array.isArray(ingredientsMatch) && ingredientsMatch[1]) {
      // Extract from "I have X, Y, Z" pattern
      ingredients = ingredientsMatch[1].split(',').map(item => item.trim()).filter(item => item.length > 0);
    } else {
      // Extract from comma-separated list
      ingredients = ingredientsMatch.map(item => item.trim()).filter(item => item.length > 0);
    }
  }
  
  // Also extract potential meal types/keywords from the query
  const keywords = [
    ...lowerQuery.match(/\b(pasta|chicken|vegetarian|vegan|dessert|quick|easy|breakfast|lunch|dinner)\b/gi) || [],
    ...lowerQuery.match(/\b(italian|asian|thai|mexican|american|indian)\b/gi) || []
  ];
  
  // If there are no ingredients or keywords but it's a request for recipes
  if ((ingredients.length === 0 && keywords.length === 0) || /what.*recipes|suggest.*recipe|recommend/i.test(lowerQuery)) {
    return {
      message: "Here are some popular recipes you might enjoy! Click on any recipe to see detailed cooking instructions.",
      recipes: sampleRecipes.slice(0, 3)
    };
  }
  
  console.log('Extracted ingredients:', ingredients);
  
  // Score recipes based on ingredient matches
  const scoredRecipes = sampleRecipes.map(recipe => {
    let score = 0;
    const recipeText = `${recipe.name} ${recipe.description} ${recipe.cuisine} ${recipe.category}`.toLowerCase();
    
    // Score based on ingredient matches
    if (recipe.ingredients) {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      
      ingredients.forEach(ingredient => {
        const ingredientLower = ingredient.toLowerCase();
        if (recipeIngredients.some(ri => ri.includes(ingredientLower))) {
          score += 2; // Direct ingredient match
        } else if (recipeText.includes(ingredientLower)) {
          score += 1; // Mentioned in description
        }
      });
    }
    
    // Score based on keyword matches
    keywords.forEach(keyword => {
      if (keyword && recipeText.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    
    return { recipe, score };
  });
  
  // Sort by score and get top recipes
  scoredRecipes.sort((a, b) => b.score - a.score);
  
  // Get recipes with a score > 0 or top recipes if no matches
  let filteredRecipes = scoredRecipes.filter(item => item.score > 0).map(item => item.recipe);
  
  // If no matches, return a subset of recipes
  if (filteredRecipes.length === 0) {
    filteredRecipes = sampleRecipes.slice(0, 2);
    
    if (ingredients.length > 0) {
      return {
        message: `I couldn't find recipes that use exactly ${ingredients.join(', ')}, but here are some recipes you might like. Click on any recipe to see detailed cooking instructions!`,
        recipes: filteredRecipes
      };
    } else {
      return {
        message: `I couldn't find exact matches for "${query}", but here are some recipes you might like. Click on any recipe to see detailed cooking instructions!`,
        recipes: filteredRecipes
      };
    }
  }
  
  // Generate a detailed response message with specific recipe names and instructions
  let message = "";
  if (ingredients.length > 0) {
    if (filteredRecipes.length === 1) {
      message = `Perfect! Using ${ingredients.join(', ')}, you can make "${filteredRecipes[0].name}" - it's a ${filteredRecipes[0].difficulty || 'medium'} difficulty ${filteredRecipes[0].cuisine || ''} dish. Click on the recipe card to see detailed step-by-step cooking instructions!`;
    } else if (filteredRecipes.length === 2) {
      message = `Great! With ${ingredients.join(', ')}, you can make "${filteredRecipes[0].name}" and "${filteredRecipes[1].name}". Click on any recipe to view detailed cooking instructions!`;
    } else {
      const recipeNames = filteredRecipes.slice(0, 3).map(r => `"${r.name}"`).join(", ");
      message = `With ${ingredients.join(', ')}, you can make several dishes including ${recipeNames}, and more! Click on any recipe card to see the full ingredients list and detailed step-by-step cooking instructions.`;
    }
  } else {
    if (filteredRecipes.length === 1) {
      message = `I found the perfect recipe for you: "${filteredRecipes[0].name}"! It's a ${filteredRecipes[0].difficulty || 'medium'} difficulty ${filteredRecipes[0].cuisine || ''} dish. Click on the recipe card to see all the ingredients and detailed cooking instructions.`;
    } else if (filteredRecipes.length === 2) {
      message = `Here are two great recipes that match what you're looking for: "${filteredRecipes[0].name}" and "${filteredRecipes[1].name}". Click on any recipe to see detailed cooking instructions!`;
    } else {
      const recipeNames = filteredRecipes.slice(0, 3).map(r => `"${r.name}"`).join(", ");
      message = `I found ${filteredRecipes.length} recipes for you, including ${recipeNames}, and more! Click on any recipe card to view the full ingredients list and step-by-step cooking instructions.`;
    }
  }
  
  if (/how to make|how do i make|cooking instructions/i.test(lowerQuery) && filteredRecipes.length > 0) {
    const recipe = filteredRecipes[0];
    const ingredients = recipe.ingredients ? recipe.ingredients.join(', ') : 'ingredients not available';
    
    let instructionSummary = '';
    if (recipe.instructions && recipe.instructions.length > 0) {
      // Get first and last step to summarize
      instructionSummary = `First, ${recipe.instructions[0].toLowerCase()} Then follow the remaining steps and finally, ${recipe.instructions[recipe.instructions.length - 1].toLowerCase()}`;
    }
    
    message = `To make "${recipe.name}", you'll need: ${ingredients}. ${instructionSummary} Click on the recipe card to see the complete step-by-step instructions!`;
  }
  
  return { message, recipes: filteredRecipes };
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demonstration, return a recipe from our sample data
  const recipe = sampleRecipes.find(r => r.id === id);
  return recipe || null;
}

// In a real implementation, this would be replaced with actual Hugging Face model calls
// For example:

/*
import { pipeline } from '@huggingface/transformers';

let recipeGenerator: any = null;

async function initAIModel() {
  try {
    recipeGenerator = await pipeline(
      'text-generation',
      'name-of-recipe-model',
      { device: 'cpu' }
    );
    console.log('Recipe AI model initialized successfully');
  } catch (error) {
    console.error('Error initializing AI model:', error);
  }
}

// Initialize the model
initAIModel();

export async function generateRecipeWithAI(ingredients: string[]): Promise<Recipe | null> {
  if (!recipeGenerator) {
    throw new Error('AI model not initialized');
  }
  
  try {
    const prompt = `Generate a recipe using these ingredients: ${ingredients.join(', ')}`;
    const result = await recipeGenerator(prompt, { 
      max_length: 500,
      temperature: 0.7,
      top_k: 50
    });
    
    // Parse the result and return a Recipe object
    // This would require some text processing logic
    
    return {
      id: Date.now().toString(),
      name: 'AI Generated Recipe',
      description: 'A recipe created by AI based on your ingredients.',
      // ... other fields would be extracted from the AI output
    };
  } catch (error) {
    console.error('Error generating recipe with AI:', error);
    return null;
  }
}
*/
