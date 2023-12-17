class RenameRecipeIngredientToRecipeSeasoning < ActiveRecord::Migration[6.1]
  def change
    rename_table :recipe_ingredients, :recipe_seasonings
  end
end
