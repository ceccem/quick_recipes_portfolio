class RecipesController < ApplicationController
  before_action :authenticate_user!, only: [:my_recipes, :new, :create, :edit, :update, :destroy]
  before_action :check_owner_or_admin, only: [:edit, :update, :destroy]

  def index
    @recipes = Recipe.all
    @q = Recipe.ransack(params[:q])
    @recipes = @q.result(distinct: true)
  end

  def show
    @recipe = Recipe.find(params[:id])
    @seasonings_with_quantities = @recipe.recipe_seasonings.includes(:seasoning)
    @ingredients = @recipe.ingredients
  end

  def new
    @recipe_form = RecipeForm.new
  end

  def create
    @recipe_form = RecipeForm.new(recipe_form_params.merge(user: current_user))
    if @recipe_form.save
      redirect_to recipes_path, notice: "レシピを投稿しました"
    else
      render :new
    end
  end

  def edit
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: "レシピを更新しました"
    else
      render :edit
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    redirect_back(fallback_location: my_recipes_path, notice: "レシピを削除しました")
  end

  def my_recipes
    @recipes = current_user.recipes
    @favorite_recipes = current_user.favorite_recipes
  end

  def new_recipes
    @recipes = Recipe.order(created_at: :desc)
    render 'index'
  end

  def popular_recipes
    @recipes = Recipe.left_joins(:favorites).group(:id).having('COUNT(favorites.id) > 0').order('COUNT(favorites.id) DESC')
    render 'index'
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :description, :cooking_time, :image, seasoning_ids: [], steps_attributes: [:id, :description, :image, :_destroy])
  end

  def recipe_form_params
    params.require(:recipe_form).permit(:title, :description, :cooking_time, :image, seasoning_ids: [], ingredient_names: [], steps_attributes: [:description, :image], seasoning_quantities: {})
  end

  def check_owner_or_admin
    @recipe = Recipe.find(params[:id])
    return if current_user.nil?
    unless current_user == @recipe.user || current_user.admin?
      redirect_to recipes_path, alert: "権限がありません"
    end
  end
end
