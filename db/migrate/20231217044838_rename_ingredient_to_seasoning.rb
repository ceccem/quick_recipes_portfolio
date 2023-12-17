class RenameSeasoningToSeasoning < ActiveRecord::Migration[6.1]
  def change
    rename_table :ingredients, :seasonings
  end
end
