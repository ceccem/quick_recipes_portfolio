class CreateRecipeSeasonings < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_seasonings do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :seasoning, null: false, foreign_key: true

      t.timestamps
    end
  end
end
