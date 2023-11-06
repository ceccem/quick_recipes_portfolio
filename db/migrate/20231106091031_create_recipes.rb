class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :description
      t.integer :cooking_time
      t.string :image
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
