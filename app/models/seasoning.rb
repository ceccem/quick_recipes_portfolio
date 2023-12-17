class Seasoning < ApplicationRecord
  has_many :recipe_seasonings
  has_many :recipes, through: :recipe_seasonings
end
