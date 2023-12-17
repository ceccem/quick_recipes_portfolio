class RecipeSeasoning < ApplicationRecord
  belongs_to :recipe
  belongs_to :seasoning
end
