
import { Recipe } from '@/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Creamy Garlic Parmesan Pasta',
    description: 'A rich and creamy pasta dish with garlic and parmesan cheese, ready in just 20 minutes.',
    cuisine: 'Italian',
    category: 'Main Course',
    difficulty: 'Easy',
    prepTime: '5 mins',
    cookingTime: '15 mins',
    servings: 4,
    ingredients: [
      '8 oz fettuccine pasta',
      '2 tbsp butter',
      '4 cloves garlic, minced',
      '1 cup heavy cream',
      '1 cup grated Parmesan cheese',
      'Salt and pepper to taste',
      'Fresh parsley, chopped (for garnish)'
    ],
    instructions: [
      'Cook pasta according to package instructions. Drain and set aside.',
      'In a large skillet, melt butter over medium heat. Add minced garlic and cook until fragrant, about 1 minute.',
      'Pour in heavy cream, bring to a simmer, and cook for 2 minutes.',
      'Reduce heat to low and gradually stir in Parmesan cheese until melted and sauce is smooth.',
      'Add the cooked pasta to the sauce and toss to coat evenly. Season with salt and pepper.',
      'Serve immediately, garnished with fresh parsley and extra Parmesan cheese if desired.'
    ],
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a',
    nutritionInfo: {
      calories: 520,
      protein: 18,
      carbs: 42,
      fat: 32
    }
  },
  {
    id: '2',
    name: 'Avocado Chicken Salad',
    description: 'A nutritious and filling salad featuring grilled chicken, creamy avocado, and fresh vegetables.',
    cuisine: 'American',
    category: 'Salad',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookingTime: '15 mins',
    servings: 2,
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '1 tbsp olive oil',
      '1 tsp paprika',
      'Salt and pepper to taste',
      '4 cups mixed salad greens',
      '1 ripe avocado, sliced',
      '1 cup cherry tomatoes, halved',
      '1/4 red onion, thinly sliced',
      '1/4 cup feta cheese, crumbled',
      '2 tbsp balsamic vinaigrette'
    ],
    instructions: [
      'Season chicken breasts with paprika, salt, and pepper.',
      'Heat olive oil in a skillet over medium-high heat. Cook chicken for 6-7 minutes per side until fully cooked. Let rest for 5 minutes, then slice.',
      'In a large bowl, combine salad greens, cherry tomatoes, red onion, and avocado slices.',
      'Top with sliced chicken and crumbled feta cheese.',
      'Drizzle with balsamic vinaigrette and serve immediately.'
    ],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    nutritionInfo: {
      calories: 380,
      protein: 29,
      carbs: 14,
      fat: 24
    }
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with a soft center and crispy edges.',
    cuisine: 'American',
    category: 'Dessert',
    difficulty: 'Easy',
    prepTime: '15 mins',
    cookingTime: '10 mins',
    servings: 24,
    ingredients: [
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup brown sugar, packed',
      '2 eggs',
      '2 tsp vanilla extract',
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1/2 tsp salt',
      '2 cups semi-sweet chocolate chips',
      '1 cup chopped walnuts (optional)'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, cream together butter and both sugars until light and fluffy.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'In a separate bowl, combine flour, baking soda, and salt. Gradually add to the wet ingredients and mix well.',
      'Fold in chocolate chips and walnuts if using.',
      'Drop rounded tablespoons of dough onto ungreased baking sheets.',
      'Bake for 9-11 minutes until golden brown. Let cool on baking sheets for 2 minutes before transferring to wire racks.'
    ],
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    nutritionInfo: {
      calories: 180,
      protein: 2,
      carbs: 24,
      fat: 10
    }
  },
  {
    id: '4',
    name: 'Thai Green Curry',
    description: 'A fragrant and flavorful Thai curry with vegetables and your choice of protein.',
    cuisine: 'Thai',
    category: 'Main Course',
    difficulty: 'Medium',
    prepTime: '20 mins',
    cookingTime: '25 mins',
    servings: 4,
    ingredients: [
      '2 tbsp green curry paste',
      '1 can (14 oz) coconut milk',
      '1 lb chicken, tofu, or shrimp',
      '2 bell peppers, sliced',
      '1 zucchini, sliced',
      '1 cup snap peas',
      '1 tbsp fish sauce (or soy sauce for vegetarian)',
      '1 tbsp brown sugar',
      'Fresh basil leaves',
      'Lime wedges for serving',
      'Cooked jasmine rice for serving'
    ],
    instructions: [
      'In a large pot or wok, heat 2 tablespoons of coconut milk over medium heat.',
      'Add curry paste and cook for 1-2 minutes until fragrant.',
      'Pour in remaining coconut milk and bring to a simmer.',
      'Add protein of choice and cook until almost done.',
      'Add vegetables and simmer until tender but still crisp.',
      'Stir in fish sauce and brown sugar, adjusting to taste.',
      'Garnish with fresh basil leaves and serve with lime wedges and jasmine rice.'
    ],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    nutritionInfo: {
      calories: 410,
      protein: 28,
      carbs: 23,
      fat: 24
    }
  },
  {
    id: '5',
    name: 'Breakfast Smoothie Bowl',
    description: 'A nutritious and colorful smoothie bowl topped with fresh fruits and granola.',
    cuisine: 'International',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '10 mins',
    cookingTime: '0 mins',
    servings: 1,
    ingredients: [
      '1 frozen banana',
      '1/2 cup frozen berries (strawberries, blueberries, etc.)',
      '1/4 cup Greek yogurt',
      '1/4 cup almond milk',
      '1 tbsp honey or maple syrup',
      'Toppings: sliced fresh fruits, granola, chia seeds, coconut flakes'
    ],
    instructions: [
      'In a blender, combine frozen banana, frozen berries, Greek yogurt, almond milk, and sweetener.',
      'Blend until smooth but thick. Add more liquid if needed, but keep it thick enough to eat with a spoon.',
      'Pour into a bowl and arrange toppings artfully on top.',
      'Enjoy immediately before it melts!'
    ],
    image: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3',
    nutritionInfo: {
      calories: 320,
      protein: 12,
      carbs: 62,
      fat: 6
    }
  },
  {
    id: '6',
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy stir fry loaded with colorful vegetables and a savory sauce.',
    cuisine: 'Asian',
    category: 'Main Course',
    difficulty: 'Easy',
    prepTime: '15 mins',
    cookingTime: '10 mins',
    servings: 4,
    ingredients: [
      '2 tbsp vegetable oil',
      '2 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '1 bell pepper, sliced',
      '2 carrots, julienned',
      '1 cup broccoli florets',
      '1 cup snap peas',
      '1 cup mushrooms, sliced',
      'For the sauce:',
      '3 tbsp soy sauce',
      '1 tbsp honey',
      '1 tsp sesame oil',
      '1 tbsp cornstarch mixed with 2 tbsp water',
      'Sesame seeds and green onions for garnish'
    ],
    instructions: [
      'Mix sauce ingredients in a small bowl. Set aside.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add vegetables, starting with the firmest ones (carrots, broccoli). Stir fry for 2-3 minutes.',
      'Add remaining vegetables and continue stir frying for 3-4 minutes until crisp-tender.',
      'Pour in sauce and cook, stirring constantly, until sauce thickens and coats the vegetables.',
      'Garnish with sesame seeds and sliced green onions. Serve with rice or noodles.'
    ],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    nutritionInfo: {
      calories: 180,
      protein: 5,
      carbs: 26,
      fat: 8
    }
  }
];
