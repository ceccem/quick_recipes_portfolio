class AddQuantityToRecipeSeasonings < ActiveRecord::Migration[6.1]
  def change
    add_column :recipe_seasonings, :quantity, :string
  end
end
