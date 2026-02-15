import React, { useState, useEffect } from 'react';
import { Camera, Plus, Calendar, ShoppingCart, ChefHat, Trash2, Check, X, BookmarkPlus, Sparkles, Download } from 'lucide-react';

const MealPlannerApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [weekPlan, setWeekPlan] = useState({});
  const [groceryList, setGroceryList] = useState([]);
  const [currentView, setCurrentView] = useState('plan');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const recommendedRecipes = [
    // Mains
    {
      id: 'rec1',
      name: 'Vegetarian Buddha Bowl',
      type: 'vegetarian',
      category: 'main',
      prepTime: '25 min',
      ingredients: ['quinoa', 'chickpeas', 'sweet potato', 'kale', 'tahini', 'lemon', 'avocado'],
      servings: 5
    },
    {
      id: 'rec2',
      name: 'Grilled Chicken Tacos',
      type: 'meat',
      category: 'main',
      prepTime: '30 min',
      ingredients: ['chicken breast', 'tortillas', 'bell peppers', 'onion', 'lime', 'cilantro', 'cheese', 'sour cream'],
      servings: 5
    },
    {
      id: 'rec3',
      name: 'Veggie Stir-Fry with Tofu',
      type: 'vegetarian',
      category: 'main',
      prepTime: '20 min',
      ingredients: ['broccoli', 'carrots', 'snap peas', 'tofu', 'soy sauce', 'ginger', 'garlic'],
      servings: 5
    },
    {
      id: 'rec4',
      name: 'Spaghetti Bolognese',
      type: 'meat',
      category: 'main',
      prepTime: '45 min',
      ingredients: ['ground beef', 'spaghetti', 'tomato sauce', 'onion', 'garlic', 'basil', 'parmesan'],
      servings: 5
    },
    {
      id: 'rec5',
      name: 'Lentil Curry',
      type: 'vegetarian',
      category: 'main',
      prepTime: '35 min',
      ingredients: ['red lentils', 'coconut milk', 'curry powder', 'tomatoes', 'spinach', 'onion', 'garlic'],
      servings: 5
    },
    {
      id: 'rec6',
      name: 'BBQ Pulled Pork Sandwiches',
      type: 'meat',
      category: 'main',
      prepTime: '4 hours',
      ingredients: ['pork shoulder', 'BBQ sauce', 'buns', 'coleslaw mix', 'apple cider vinegar'],
      servings: 5
    },
    {
      id: 'rec7',
      name: 'Teriyaki Salmon',
      type: 'meat',
      category: 'main',
      prepTime: '25 min',
      ingredients: ['salmon fillets', 'teriyaki sauce', 'sesame seeds'],
      servings: 5
    },
    {
      id: 'rec8',
      name: 'Eggplant Parmesan',
      type: 'vegetarian',
      category: 'main',
      prepTime: '40 min',
      ingredients: ['eggplant', 'marinara sauce', 'mozzarella', 'parmesan', 'breadcrumbs', 'basil'],
      servings: 5
    },
    // Vegetable Sides
    {
      id: 'veg1',
      name: 'Garlic Roasted Vegetables',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '30 min',
      ingredients: ['zucchini', 'bell peppers', 'red onion', 'garlic', 'olive oil', 'herbs'],
      servings: 5
    },
    {
      id: 'veg2',
      name: 'Garden Salad',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '10 min',
      ingredients: ['mixed greens', 'tomatoes', 'cucumber', 'carrots', 'dressing'],
      servings: 5
    },
    {
      id: 'veg3',
      name: 'Green Beans Almondine',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '15 min',
      ingredients: ['green beans', 'butter', 'almonds', 'lemon', 'garlic'],
      servings: 5
    },
    {
      id: 'veg4',
      name: 'Steamed Broccoli',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '10 min',
      ingredients: ['broccoli', 'butter', 'lemon', 'salt', 'pepper'],
      servings: 5
    },
    {
      id: 'veg5',
      name: 'Roasted Brussels Sprouts',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '25 min',
      ingredients: ['brussels sprouts', 'olive oil', 'balsamic vinegar', 'garlic', 'parmesan'],
      servings: 5
    },
    {
      id: 'veg6',
      name: 'Glazed Carrots',
      type: 'vegetarian',
      category: 'side-vegetable',
      prepTime: '20 min',
      ingredients: ['carrots', 'butter', 'honey', 'thyme'],
      servings: 5
    },
    // Protein Sides
    {
      id: 'protein1',
      name: 'Grilled Chicken Breast',
      type: 'meat',
      category: 'side-protein',
      prepTime: '20 min',
      ingredients: ['chicken breast', 'olive oil', 'garlic', 'herbs', 'lemon'],
      servings: 5
    },
    {
      id: 'protein2',
      name: 'Pan-Seared Tofu',
      type: 'vegetarian',
      category: 'side-protein',
      prepTime: '15 min',
      ingredients: ['firm tofu', 'soy sauce', 'sesame oil', 'garlic', 'ginger'],
      servings: 5
    },
    {
      id: 'protein3',
      name: 'Baked Cod',
      type: 'meat',
      category: 'side-protein',
      prepTime: '20 min',
      ingredients: ['cod fillets', 'lemon', 'butter', 'herbs', 'breadcrumbs'],
      servings: 5
    },
    {
      id: 'protein4',
      name: 'Black Bean Patties',
      type: 'vegetarian',
      category: 'side-protein',
      prepTime: '25 min',
      ingredients: ['black beans', 'breadcrumbs', 'onion', 'spices', 'egg'],
      servings: 5
    },
    {
      id: 'protein5',
      name: 'Turkey Meatballs',
      type: 'meat',
      category: 'side-protein',
      prepTime: '30 min',
      ingredients: ['ground turkey', 'breadcrumbs', 'egg', 'parmesan', 'herbs'],
      servings: 5
    },
    // Starch Sides
    {
      id: 'starch1',
      name: 'Creamy Mashed Potatoes',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '25 min',
      ingredients: ['potatoes', 'butter', 'milk', 'garlic', 'chives', 'salt', 'pepper'],
      servings: 5
    },
    {
      id: 'starch2',
      name: 'Steamed White Rice',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '20 min',
      ingredients: ['white rice', 'water', 'salt'],
      servings: 5
    },
    {
      id: 'starch3',
      name: 'Garlic Bread',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '15 min',
      ingredients: ['baguette', 'butter', 'garlic', 'parsley', 'parmesan'],
      servings: 5
    },
    {
      id: 'starch4',
      name: 'Pasta Salad',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '15 min',
      ingredients: ['pasta', 'mozzarella', 'tomatoes', 'basil', 'olive oil', 'balsamic vinegar'],
      servings: 5
    },
    {
      id: 'starch5',
      name: 'Baked Sweet Potato',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '45 min',
      ingredients: ['sweet potatoes', 'butter', 'cinnamon', 'salt'],
      servings: 5
    },
    {
      id: 'starch6',
      name: 'Quinoa Pilaf',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '25 min',
      ingredients: ['quinoa', 'vegetable broth', 'onion', 'garlic', 'herbs'],
      servings: 5
    },
    {
      id: 'starch7',
      name: 'Mac and Cheese',
      type: 'vegetarian',
      category: 'side-starch',
      prepTime: '30 min',
      ingredients: ['pasta', 'cheddar cheese', 'milk', 'butter', 'flour'],
      servings: 5
    }
  ];

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    type: 'vegetarian',
    category: 'main',
    prepTime: '',
    ingredients: '',
    servings: 5
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log('=== LOADING DATA ===');
    setLoading(true);
    
    if (!window.storage) {
      console.log('⚠️ Storage not available, starting fresh');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to load recipes...');
      const recipesData = await window.storage.get('family-recipes', false).catch(err => {
        console.log('No recipes found (expected on first load):', err.message);
        return null;
      });
      
      console.log('Attempting to load plan...');
      const planData = await window.storage.get('week-plan', false).catch(err => {
        console.log('No plan found (expected on first load):', err.message);
        return null;
      });

      if (recipesData?.value) {
        const parsed = JSON.parse(recipesData.value);
        console.log('✓ Loaded recipes from storage:', parsed.length, 'recipes');
        console.log('Recipes:', parsed);
        setRecipes(parsed);
      } else {
        console.log('No saved recipes found');
      }
      
      if (planData?.value) {
        const parsed = JSON.parse(planData.value);
        console.log('✓ Loaded plan from storage');
        setWeekPlan(parsed);
        generateGroceryList(parsed);
      } else {
        console.log('No saved plan found');
      }
    } catch (error) {
      console.error('✗ Error loading data:', error);
    } finally {
      setLoading(false);
      console.log('=== LOAD COMPLETE ===');
    }
  };

  const saveRecipes = async (updatedRecipes) => {
    console.log('=== SAVING RECIPES ===');
    console.log('Number of recipes:', updatedRecipes.length);
    console.log('Recipes:', updatedRecipes);
    
    // Update UI immediately for better UX
    setRecipes(updatedRecipes);
    
    if (!window.storage) {
      console.warn('⚠️ Storage API not available - changes will not persist');
      alert('Note: Your recipes are saved for this session only. They will not persist after closing the app.');
      return;
    }

    try {
      const dataToSave = JSON.stringify(updatedRecipes);
      console.log('Data to save (length):', dataToSave.length);
      
      // Use shared: false to make data persist across sessions
      const result = await window.storage.set('family-recipes', dataToSave, false);
      console.log('✓ Save successful, result:', result);
      
      // Verify the save worked
      const verification = await window.storage.get('family-recipes', false);
      if (verification?.value) {
        const saved = JSON.parse(verification.value);
        console.log('✓ Verified - recipes in storage:', saved.length);
      } else {
        console.error('✗ Verification failed - no data found after save');
      }
    } catch (error) {
      console.error('✗ Error saving recipes:', error);
      // Don't show alert since UI is already updated
    }
  };

  const saveWeekPlan = async (updatedPlan) => {
    // Update UI immediately for better UX
    setWeekPlan(updatedPlan);
    generateGroceryList(updatedPlan);
    
    if (!window.storage) {
      console.warn('Storage API not available - changes will not persist');
      return;
    }

    try {
      console.log('Saving week plan:', updatedPlan);
      const result = await window.storage.set('week-plan', JSON.stringify(updatedPlan), false);
      console.log('Save result:', result);
      
      if (!result) {
        console.warn('Storage set returned null');
      }
    } catch (error) {
      console.error('Error saving week plan:', error);
      // Don't show alert since UI is already updated
    }
  };

  const addRecipe = async () => {
    if (!newRecipe.name || !newRecipe.ingredients) {
      alert('Please fill in recipe name and ingredients');
      return;
    }

    if (editingRecipe) {
      // Update existing recipe
      const updatedRecipes = recipes.map(r => 
        r.id === editingRecipe.id 
          ? {
              ...r,
              name: newRecipe.name,
              type: newRecipe.type,
              category: newRecipe.category,
              prepTime: newRecipe.prepTime || '30 min',
              ingredients: newRecipe.ingredients.split(',').map(i => i.trim()).filter(i => i),
              servings: parseInt(newRecipe.servings) || 5
            }
          : r
      );
      await saveRecipes(updatedRecipes);
      
      // Update week plan if this recipe is scheduled
      const updatedPlan = { ...weekPlan };
      let planChanged = false;
      Object.keys(updatedPlan).forEach(day => {
        const dayMeal = updatedPlan[day];
        ['main', 'sideVegetable', 'sideProtein', 'sideStarch'].forEach(slot => {
          if (dayMeal[slot]?.id === editingRecipe.id) {
            dayMeal[slot] = updatedRecipes.find(r => r.id === editingRecipe.id);
            planChanged = true;
          }
        });
      });
      if (planChanged) {
        await saveWeekPlan(updatedPlan);
      }
    } else {
      // Add new recipe
      const recipe = {
        id: `custom-${Date.now()}`,
        name: newRecipe.name,
        type: newRecipe.type,
        category: newRecipe.category,
        prepTime: newRecipe.prepTime || '30 min',
        ingredients: newRecipe.ingredients.split(',').map(i => i.trim()).filter(i => i),
        servings: parseInt(newRecipe.servings) || 5,
        custom: true
      };
      const updatedRecipes = [...recipes, recipe];
      await saveRecipes(updatedRecipes);
    }
    
    setNewRecipe({ name: '', type: 'vegetarian', category: 'main', prepTime: '', ingredients: '', servings: 5 });
    setEditingRecipe(null);
    setShowRecipeModal(false);
  };

  const startEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe({
      name: recipe.name,
      type: recipe.type,
      category: recipe.category,
      prepTime: recipe.prepTime,
      ingredients: recipe.ingredients.join(', '),
      servings: recipe.servings
    });
    setShowRecipeModal(true);
  };

  const addRecommendedRecipe = async (recipe) => {
    if (!recipes.find(r => r.id === recipe.id)) {
      await saveRecipes([...recipes, recipe]);
    }
    setShowRecommendations(false);
  };

  const deleteRecipe = async (recipeId) => {
    const recipeToDelete = recipes.find(r => r.id === recipeId);
    if (!recipeToDelete) return;
    
    if (!confirm(`Are you sure you want to delete "${recipeToDelete.name}"? This cannot be undone.`)) {
      return;
    }
    
    const updatedRecipes = recipes.filter(r => r.id !== recipeId);
    await saveRecipes(updatedRecipes);
    
    // Also remove from week plan if it's scheduled
    const updatedPlan = { ...weekPlan };
    let planChanged = false;
    Object.keys(updatedPlan).forEach(day => {
      const dayMeal = updatedPlan[day];
      ['main', 'sideVegetable', 'sideProtein', 'sideStarch'].forEach(slot => {
        if (dayMeal[slot]?.id === recipeId) {
          dayMeal[slot] = null;
          planChanged = true;
        }
      });
      // Clean up empty days
      if (!dayMeal.main && !dayMeal.sideVegetable && !dayMeal.sideProtein && !dayMeal.sideStarch) {
        delete updatedPlan[day];
      }
    });
    if (planChanged) {
      await saveWeekPlan(updatedPlan);
    }
  };

  const assignRecipe = async (day, recipe, recipeType = 'main') => {
    const updated = { ...weekPlan };
    
    if (!updated[day]) {
      updated[day] = { main: null, sideVegetable: null, sideProtein: null, sideStarch: null };
    }
    
    if (recipeType === 'main') {
      updated[day].main = recipe;
    } else if (recipeType === 'side-vegetable') {
      updated[day].sideVegetable = recipe;
    } else if (recipeType === 'side-protein') {
      updated[day].sideProtein = recipe;
    } else if (recipeType === 'side-starch') {
      updated[day].sideStarch = recipe;
    }
    
    await saveWeekPlan(updated);
    setSelectedDay(null);
  };

  const removeFromPlan = async (day, recipeType = null) => {
    const updated = { ...weekPlan };
    
    if (recipeType) {
      // Remove just one specific item
      if (updated[day]) {
        if (recipeType === 'main') {
          updated[day].main = null;
        } else if (recipeType === 'side-vegetable') {
          updated[day].sideVegetable = null;
        } else if (recipeType === 'side-protein') {
          updated[day].sideProtein = null;
        } else if (recipeType === 'side-starch') {
          updated[day].sideStarch = null;
        }
        
        // If all are null, remove the day entirely
        if (!updated[day].main && !updated[day].sideVegetable && !updated[day].sideProtein && !updated[day].sideStarch) {
          delete updated[day];
        }
      }
    } else {
      // Remove the entire day
      delete updated[day];
    }
    
    await saveWeekPlan(updated);
  };

  const generateGroceryList = (plan) => {
    const ingredientMap = {};
    
    Object.values(plan).forEach(dayMeal => {
      if (dayMeal) {
        // Handle new structure with main and three types of sides
        if (dayMeal.main || dayMeal.sideVegetable || dayMeal.sideProtein || dayMeal.sideStarch) {
          [dayMeal.main, dayMeal.sideVegetable, dayMeal.sideProtein, dayMeal.sideStarch].forEach(recipe => {
            if (recipe && recipe.ingredients) {
              recipe.ingredients.forEach(ingredient => {
                const key = ingredient.toLowerCase();
                ingredientMap[key] = (ingredientMap[key] || 0) + 1;
              });
            }
          });
        } else if (dayMeal.ingredients) {
          // Handle old structure for backwards compatibility
          dayMeal.ingredients.forEach(ingredient => {
            const key = ingredient.toLowerCase();
            ingredientMap[key] = (ingredientMap[key] || 0) + 1;
          });
        }
      }
    });

    const list = Object.entries(ingredientMap).map(([ingredient, count]) => ({
      name: ingredient,
      count,
      checked: false
    }));

    setGroceryList(list);
  };

  const toggleGroceryItem = (index) => {
    const updated = [...groceryList];
    updated[index].checked = !updated[index].checked;
    setGroceryList(updated);
  };

  const exportToReminders = async () => {
    const uncheckedItems = groceryList.filter(item => !item.checked);
    
    if (uncheckedItems.length === 0) {
      alert('All items are checked off! Nothing to export.');
      return;
    }

    // Create a formatted text list
    const listText = uncheckedItems.map(item => 
      `• ${item.name}${item.count > 1 ? ` (×${item.count})` : ''}`
    ).join('\n');

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(listText);
      
      // Show success message
      alert(`✓ Copied ${uncheckedItems.length} items to clipboard!\n\nYou can now:\n• Paste into Reminders app manually\n• Ask me: "Create reminders for these grocery items" and paste the list`);
      
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      
      // Fallback: show the list that can be manually copied
      const fallbackMessage = `Copy these ${uncheckedItems.length} items:\n\n${listText}\n\nThen paste into your Reminders app or ask me to create them for you.`;
      alert(fallbackMessage);
    }
  };

  // Helper to get grocery list as structured data
  window.getGroceryList = () => {
    return groceryList.filter(item => !item.checked).map(item => ({
      name: item.name,
      count: item.count
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 text-lg">Loading your meal planner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Quicksand:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Quicksand', sans-serif;
        }
        
        .handwritten {
          font-family: 'Caveat', cursive;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .float {
          animation: float 6s ease-in-out infinite;
        }
        
        .slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        .recipe-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .recipe-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .recipe-card:hover::before {
          left: 100%;
        }
        
        .recipe-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(251, 146, 60, 0.3);
        }
        
        .tab-button {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .tab-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #f97316, #ea580c);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        
        .tab-button.active::after {
          width: 80%;
        }
        
        .grocery-item {
          transition: all 0.2s ease;
        }
        
        .grocery-item:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateX(4px);
        }
        
        .checkbox-wrapper {
          position: relative;
          cursor: pointer;
        }
        
        .checkbox-wrapper input[type="checkbox"] {
          appearance: none;
          width: 24px;
          height: 24px;
          border: 2px solid #fb923c;
          border-radius: 6px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .checkbox-wrapper input[type="checkbox"]:checked {
          background: #fb923c;
          border-color: #fb923c;
        }
        
        .checkbox-wrapper input[type="checkbox"]:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: bold;
        }
        
        .modal-backdrop {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="float">
                <ChefHat className="w-12 h-12 text-orange-500" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="handwritten text-4xl text-gray-800">Family Meal Planner</h1>
                <p className="text-sm text-gray-600 mt-1">Planning delicious meals for 5</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView('plan')}
                className={`tab-button px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentView === 'plan' 
                    ? 'active bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                <Calendar className="w-5 h-5 inline mr-2" />
                Week Plan
              </button>
              <button
                onClick={() => setCurrentView('recipes')}
                className={`tab-button px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentView === 'recipes' 
                    ? 'active bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                <BookmarkPlus className="w-5 h-5 inline mr-2" />
                Recipes
              </button>
              <button
                onClick={() => setCurrentView('grocery')}
                className={`tab-button px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentView === 'grocery' 
                    ? 'active bg-orange-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                Grocery List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Week Plan View */}
        {currentView === 'plan' && (
          <div className="slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="handwritten text-3xl text-gray-800">This Week's Menu</h2>
              <p className="text-sm text-gray-600">🌱 = Vegetarian | 🍖 = Contains Meat</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {days.map((day, index) => {
                const dayMeal = weekPlan[day] || { main: null, sideVegetable: null, sideProtein: null, sideStarch: null };
                const hasMain = dayMeal.main;
                const hasVeggie = dayMeal.sideVegetable;
                const hasProtein = dayMeal.sideProtein;
                const hasStarch = dayMeal.sideStarch;
                const hasAnything = hasMain || hasVeggie || hasProtein || hasStarch;
                
                return (
                  <div
                    key={day}
                    className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-xl text-gray-800">{day}</h3>
                      {hasAnything && (
                        <button
                          onClick={() => removeFromPlan(day)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Clear entire day"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Main Course */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2">MAIN COURSE</p>
                      {hasMain ? (
                        <div className="bg-orange-50 rounded-lg p-3 relative group">
                          <button
                            onClick={() => removeFromPlan(day, 'main')}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove main"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center justify-between pr-6">
                            <p className="font-semibold text-gray-800 text-sm">
                              {dayMeal.main.name}
                            </p>
                            <span className="text-xl">
                              {dayMeal.main.type === 'vegetarian' ? '🌱' : '🍖'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">⏱️ {dayMeal.main.prepTime}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedDay({ day, type: 'main' })}
                          className="w-full py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all text-sm font-semibold"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Add Main
                        </button>
                      )}
                    </div>

                    {/* Vegetable Side */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2">VEGETABLE</p>
                      {hasVeggie ? (
                        <div className="bg-green-50 rounded-lg p-3 relative group">
                          <button
                            onClick={() => removeFromPlan(day, 'side-vegetable')}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove vegetable"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center justify-between pr-6">
                            <p className="font-semibold text-gray-800 text-sm">
                              {dayMeal.sideVegetable.name}
                            </p>
                            <span className="text-xl">🥦</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">⏱️ {dayMeal.sideVegetable.prepTime}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedDay({ day, type: 'side-vegetable' })}
                          className="w-full py-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-all text-sm font-semibold"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Add Veggie
                        </button>
                      )}
                    </div>

                    {/* Protein Side */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2">PROTEIN</p>
                      {hasProtein ? (
                        <div className="bg-pink-50 rounded-lg p-3 relative group">
                          <button
                            onClick={() => removeFromPlan(day, 'side-protein')}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove protein"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center justify-between pr-6">
                            <p className="font-semibold text-gray-800 text-sm">
                              {dayMeal.sideProtein.name}
                            </p>
                            <span className="text-xl">
                              {dayMeal.sideProtein.type === 'vegetarian' ? '🌱' : '🍗'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">⏱️ {dayMeal.sideProtein.prepTime}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedDay({ day, type: 'side-protein' })}
                          className="w-full py-3 border-2 border-dashed border-pink-300 rounded-lg text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-all text-sm font-semibold"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Add Protein
                        </button>
                      )}
                    </div>

                    {/* Starch Side */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">STARCH</p>
                      {hasStarch ? (
                        <div className="bg-yellow-50 rounded-lg p-3 relative group">
                          <button
                            onClick={() => removeFromPlan(day, 'side-starch')}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove starch"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="flex items-center justify-between pr-6">
                            <p className="font-semibold text-gray-800 text-sm">
                              {dayMeal.sideStarch.name}
                            </p>
                            <span className="text-xl">🍚</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">⏱️ {dayMeal.sideStarch.prepTime}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedDay({ day, type: 'side-starch' })}
                          className="w-full py-3 border-2 border-dashed border-yellow-300 rounded-lg text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400 transition-all text-sm font-semibold"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Add Starch
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recipes View */}
        {currentView === 'recipes' && (
          <div className="slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="handwritten text-3xl text-gray-800">Family Recipes</h2>
              <div className="space-x-3">
                <button
                  onClick={() => setShowRecommendations(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Discover Recipes
                </button>
                <button
                  onClick={() => setShowRecipeModal(true)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Plus className="w-5 h-5 inline mr-2" />
                  Add Recipe
                </button>
              </div>
            </div>

            {recipes.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-orange-200">
                <ChefHat className="w-20 h-20 text-orange-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">No recipes saved yet!</p>
                <p className="text-gray-500">Add your favorite family recipes or discover new ones.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800 flex-1">{recipe.name}</h3>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-2xl">
                          {recipe.type === 'vegetarian' ? '🌱' : '🍖'}
                        </span>
                        <button
                          onClick={() => startEditRecipe(recipe)}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                          title="Edit recipe"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteRecipe(recipe.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title="Delete recipe"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        recipe.category === 'main' 
                          ? 'bg-orange-100 text-orange-700' 
                          : recipe.category === 'side-vegetable'
                          ? 'bg-green-100 text-green-700'
                          : recipe.category === 'side-protein'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {recipe.category === 'main' ? '🍽️ MAIN' : 
                         recipe.category === 'side-vegetable' ? '🥦 VEGETABLE' :
                         recipe.category === 'side-protein' ? '🍗 PROTEIN' :
                         '🍚 STARCH'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">⏱️ {recipe.prepTime}</p>
                    <p className="text-sm text-gray-600 mb-3">👨‍👩‍👧‍👦 Serves {recipe.servings}</p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 5).map((ing, i) => (
                          <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            {ing}
                          </span>
                        ))}
                        {recipe.ingredients.length > 5 && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            +{recipe.ingredients.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grocery List View */}
        {currentView === 'grocery' && (
          <div className="slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="handwritten text-3xl text-gray-800">Shopping List</h2>
              {groceryList.length > 0 && (
                <button
                  onClick={exportToReminders}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5 inline mr-2" />
                  Export to Reminders
                </button>
              )}
            </div>

            {groceryList.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-orange-200">
                <ShoppingCart className="w-20 h-20 text-orange-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-4">No grocery list yet!</p>
                <p className="text-gray-500">Plan your week's meals to generate a shopping list.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>{groceryList.filter(i => !i.checked).length}</strong> items to buy · 
                    <strong className="ml-2">{groceryList.filter(i => i.checked).length}</strong> checked off
                  </p>
                </div>
                
                <div className="space-y-2">
                  {groceryList.map((item, index) => (
                    <div
                      key={index}
                      className={`grocery-item flex items-center p-4 rounded-lg border-2 ${
                        item.checked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-orange-200 bg-white'
                      }`}
                    >
                      <label className="checkbox-wrapper flex items-center flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleGroceryItem(index)}
                          className="mr-4"
                        />
                        <span className={`flex-1 font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                        {item.count > 1 && (
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            item.checked 
                              ? 'bg-green-200 text-green-700' 
                              : 'bg-orange-200 text-orange-700'
                          }`}>
                            x{item.count}
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Day Meal Selection Modal */}
      {selectedDay && (
        <div className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="modal-content bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b-2 border-orange-200 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="handwritten text-3xl text-gray-800">
                    Choose for {selectedDay.day}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedDay.type === 'main' ? '🍽️ Main Course' : 
                     selectedDay.type === 'side-vegetable' ? '🥦 Vegetable Side' :
                     selectedDay.type === 'side-protein' ? '🍗 Protein Side' :
                     '🍚 Starch Side'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3">
              {recipes.filter(r => r.category === selectedDay.type).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    No {selectedDay.type === 'main' ? 'main courses' : 
                        selectedDay.type === 'side-vegetable' ? 'vegetable sides' :
                        selectedDay.type === 'side-protein' ? 'protein sides' :
                        'starch sides'} available yet!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDay(null);
                      setCurrentView('recipes');
                      setShowRecommendations(true);
                    }}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Discover Recipes
                  </button>
                </div>
              ) : (
                recipes
                  .filter(recipe => recipe.category === selectedDay.type)
                  .map(recipe => (
                    <button
                      key={recipe.id}
                      onClick={() => assignRecipe(selectedDay.day, recipe, selectedDay.type)}
                      className="w-full text-left p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{recipe.name}</p>
                          <p className="text-sm text-gray-600">
                            ⏱️ {recipe.prepTime} · 👨‍👩‍👧‍👦 Serves {recipe.servings}
                          </p>
                        </div>
                        <span className="text-2xl ml-4">
                          {recipe.type === 'vegetarian' ? '🌱' : '🍖'}
                        </span>
                      </div>
                    </button>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showRecipeModal && (
        <div className="modal-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="modal-content bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h3 className="handwritten text-3xl text-white">
                  {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
                </h3>
                <button
                  onClick={() => {
                    setShowRecipeModal(false);
                    setEditingRecipe(null);
                    setNewRecipe({ name: '', type: 'vegetarian', category: 'main', prepTime: '', ingredients: '', servings: 5 });
                  }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Recipe Name</label>
                <input
                  type="text"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="e.g., Mom's Famous Pasta"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewRecipe({...newRecipe, category: 'main'})}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.category === 'main'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🍽️ Main
                  </button>
                  <button
                    onClick={() => setNewRecipe({...newRecipe, category: 'side-vegetable'})}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.category === 'side-vegetable'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🥦 Vegetable
                  </button>
                  <button
                    onClick={() => setNewRecipe({...newRecipe, category: 'side-protein'})}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.category === 'side-protein'
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🍗 Protein
                  </button>
                  <button
                    onClick={() => setNewRecipe({...newRecipe, category: 'side-starch'})}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.category === 'side-starch'
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🍚 Starch
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setNewRecipe({...newRecipe, type: 'vegetarian'})}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.type === 'vegetarian'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🌱 Vegetarian
                  </button>
                  <button
                    onClick={() => setNewRecipe({...newRecipe, type: 'meat'})}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                      newRecipe.type === 'meat'
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🍖 Contains Meat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prep Time</label>
                  <input
                    type="text"
                    value={newRecipe.prepTime}
                    onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="e.g., 30 min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Servings</label>
                  <input
                    type="number"
                    value={newRecipe.servings}
                    onChange={(e) => setNewRecipe({...newRecipe, servings: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ingredients (comma-separated)
                </label>
                <textarea
                  value={newRecipe.ingredients}
                  onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                  rows="4"
                  placeholder="pasta, tomatoes, basil, garlic, olive oil"
                />
              </div>

              <button
                onClick={addRecipe}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {editingRecipe ? 'Update Recipe' : 'Save Recipe'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Modal */}
      {showRecommendations && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowRecommendations(false)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl" style={{maxHeight: '85vh', display: 'flex', flexDirection: 'column'}} onClick={(e) => e.stopPropagation()}>
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h3 className="handwritten text-3xl text-white">Recommended Recipes</h3>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-white/90 mt-2">Curated recipes perfect for your family</p>
            </div>

            {/* Scrollable Content */}
            <div className="p-6" style={{overflowY: 'auto', flex: '1 1 auto'}}>
              {/* Main Courses */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-3">🍽️ Main Courses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedRecipes.filter(r => r.category === 'main').map(recipe => {
                    const alreadySaved = recipes.find(r => r.id === recipe.id);
                    return (
                      <div
                        key={recipe.id}
                        className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-base text-gray-800 flex-1">{recipe.name}</h5>
                          <span className="text-xl ml-2">
                            {recipe.type === 'vegetarian' ? '🌱' : '🍖'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">⏱️ {recipe.prepTime}</p>
                        <button
                          onClick={() => addRecommendedRecipe(recipe)}
                          disabled={alreadySaved}
                          className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                            alreadySaved
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-500 text-white hover:bg-purple-600'
                          }`}
                        >
                          {alreadySaved ? <><Check className="w-3 h-3 inline mr-1" />Saved</> : <><Plus className="w-3 h-3 inline mr-1" />Save</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vegetable Sides */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-3">🥦 Vegetable Sides</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedRecipes.filter(r => r.category === 'side-vegetable').map(recipe => {
                    const alreadySaved = recipes.find(r => r.id === recipe.id);
                    return (
                      <div
                        key={recipe.id}
                        className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-base text-gray-800 flex-1">{recipe.name}</h5>
                          <span className="text-xl ml-2">🥦</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">⏱️ {recipe.prepTime}</p>
                        <button
                          onClick={() => addRecommendedRecipe(recipe)}
                          disabled={alreadySaved}
                          className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                            alreadySaved
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {alreadySaved ? <><Check className="w-3 h-3 inline mr-1" />Saved</> : <><Plus className="w-3 h-3 inline mr-1" />Save</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Protein Sides */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-800 mb-3">🍗 Protein Sides</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedRecipes.filter(r => r.category === 'side-protein').map(recipe => {
                    const alreadySaved = recipes.find(r => r.id === recipe.id);
                    return (
                      <div
                        key={recipe.id}
                        className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-base text-gray-800 flex-1">{recipe.name}</h5>
                          <span className="text-xl ml-2">
                            {recipe.type === 'vegetarian' ? '🌱' : '🍗'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">⏱️ {recipe.prepTime}</p>
                        <button
                          onClick={() => addRecommendedRecipe(recipe)}
                          disabled={alreadySaved}
                          className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                            alreadySaved
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-pink-500 text-white hover:bg-pink-600'
                          }`}
                        >
                          {alreadySaved ? <><Check className="w-3 h-3 inline mr-1" />Saved</> : <><Plus className="w-3 h-3 inline mr-1" />Save</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Starch Sides */}
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-3">🍚 Starch Sides</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedRecipes.filter(r => r.category === 'side-starch').map(recipe => {
                    const alreadySaved = recipes.find(r => r.id === recipe.id);
                    return (
                      <div
                        key={recipe.id}
                        className="recipe-card bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-bold text-base text-gray-800 flex-1">{recipe.name}</h5>
                          <span className="text-xl ml-2">🍚</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">⏱️ {recipe.prepTime}</p>
                        <button
                          onClick={() => addRecommendedRecipe(recipe)}
                          disabled={alreadySaved}
                          className={`w-full py-2 rounded-lg font-semibold transition-all text-sm ${
                            alreadySaved
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-yellow-500 text-white hover:bg-yellow-600'
                          }`}
                        >
                          {alreadySaved ? <><Check className="w-3 h-3 inline mr-1" />Saved</> : <><Plus className="w-3 h-3 inline mr-1" />Save</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlannerApp;
