class Recipe < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :title, presence: true
  has_many :steps, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_by, through: :favorites, source: :user
  has_many :recipe_seasonings, dependent: :destroy
  has_many :seasonings, through: :recipe_seasonings
  def self.ransackable_attributes(auth_object = nil)
    %w[title description]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
