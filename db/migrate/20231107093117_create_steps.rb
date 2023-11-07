class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.references :recipe, null: false, foreign_key: true
      t.text :description
      t.string :image
      t.integer :position

      t.timestamps
    end
  end
end
