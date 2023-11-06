class Recipe < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :title, presence: true
end
