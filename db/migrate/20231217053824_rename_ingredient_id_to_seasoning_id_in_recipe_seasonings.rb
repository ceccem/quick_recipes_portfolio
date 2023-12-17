class RenameIngredientIdToSeasoningIdInRecipeSeasonings < ActiveRecord::Migration[6.1]
  def change
    rename_column :recipe_seasonings, :ingredient_id, :seasoning_id
  end
end
