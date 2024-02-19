class RecipeSeasoning < ApplicationRecord
  belongs_to :recipe
  belongs_to :seasoning
  validates :quantity, presence: true
end
