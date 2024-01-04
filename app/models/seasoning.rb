class Seasoning < ApplicationRecord
  has_many :recipe_seasonings, dependent: :destroy
  has_many :recipes, through: :recipe_seasonings, dependent: :destroy
end
