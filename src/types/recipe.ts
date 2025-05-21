
export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine?: string;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  prepTime?: string;
  cookingTime?: string;
  servings?: number | string;
  ingredients?: string[];
  instructions?: string[];
  image?: string;
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}
