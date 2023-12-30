class RecipeForm
  include ActiveModel::Model

  attr_accessor :title, :description, :cooking_time, :image, :steps_attributes, :user, :seasoning_ids, :ingredient_ids, :ingredient_names

  def save
    return false unless valid?

    ActiveRecord::Base.transaction do
      recipe = user.recipes.create(title: title, description: description, cooking_time: cooking_time, image: image)
      steps_attributes&.each_value do |step_params|
        recipe.steps.create(step_params) unless step_params[:description].blank?
      end
      recipe.seasoning_ids = seasoning_ids if seasoning_ids.present?
      recipe.ingredient_ids = ingredient_ids if ingredient_ids.present?
      (ingredient_names || []).each do |name|
        next if name.blank?
        ingredient = Ingredient.find_or_create_by!(name: name)
        recipe.ingredients << ingredient
      end
      
      recipe.save!
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end
end
