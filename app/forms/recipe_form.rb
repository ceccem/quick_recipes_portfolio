class RecipeForm
  include ActiveModel::Model

  attr_accessor :title, :description, :cooking_time, :image, :steps_attributes, :user, :ingredient_ids

  def save
    return false unless valid?

    ActiveRecord::Base.transaction do
      recipe = user.recipes.create(title: title, description: description, cooking_time: cooking_time, image: image)
      steps_attributes&.each_value do |step_params|
        recipe.steps.create(step_params) unless step_params[:description].blank?
      end
      recipe.ingredient_ids = ingredient_ids if ingredient_ids.present?
      recipe.save!
    end
    true
  rescue ActiveRecord::RecordInvalid
    false
  end
end
