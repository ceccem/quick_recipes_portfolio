class RecipeForm
  include ActiveModel::Model

  attr_accessor :title, :description, :cooking_time, :image, :steps_attributes,
                :user, :seasoning_ids, :ingredient_ids, :ingredient_names,
                :seasoning_quantities, :ingredient_quantities

  validates :title, :description, :cooking_time, presence: true

  def initialize(attributes = {})
    super
    @ingredient_quantities ||= []
  end

  def save
    return false unless valid?

    ActiveRecord::Base.transaction do
      recipe = user.recipes.create!(title: title, description: description, cooking_time: cooking_time, image: image)
      create_steps_for(recipe)
      assign_seasonings_and_quantities_to(recipe)
      assign_ingredients_to(recipe)
      recipe.save!
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end

  private

  def create_steps_for(recipe)
    steps_attributes&.each_value do |step_params|
      recipe.steps.create!(step_params) unless step_params[:description].blank?
    end
  end

  def assign_seasonings_and_quantities_to(recipe)
    seasoning_quantities&.each do |seasoning_id, quantity|
      next if quantity.blank? || seasoning_id.blank?
      
      recipe_seasoning = recipe.recipe_seasonings.find_or_initialize_by(seasoning_id: seasoning_id)
      recipe_seasoning.quantity = quantity
      recipe_seasoning.save!
    end
  end

  def assign_ingredients_to(recipe)
    ingredient_names_array = ingredient_names || []
    ingredient_quantities_array = ingredient_quantities || []
    ingredient_names_array.zip(ingredient_quantities_array).each do |name, quantity|
      next if name.blank? || quantity.blank?
      ingredient = Ingredient.find_or_create_by!(name: name, quantity: quantity)
      recipe.ingredients << ingredient unless recipe.ingredients.include?(ingredient)
    end
  end
end
