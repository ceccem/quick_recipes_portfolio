class Recipe < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :title, presence: true
  has_many :steps, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_by, through: :favorites, source: :user
  has_many :recipe_seasonings, dependent: :destroy
  has_many :seasonings, through: :recipe_seasonings
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients
  def self.ransackable_attributes(auth_object = nil)
    %w[title description]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

  def self.ransackable_scopes(auth_object = nil)
    [:ingredients_name_cont]
  end

  def self.ingredients_name_cont(query)
    joins(:ingredients).where('ingredients.name LIKE ?', "%#{query}%")
  end
end
