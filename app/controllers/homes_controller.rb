class HomesController < ApplicationController
  def top
    @recipes = Recipe.all
    @random_recipes = Recipe.order("RANDOM()").limit(4)
    @popular_recipes = Recipe.joins(:favorites)
                             .group('recipes.id')
                             .having('COUNT(favorites.id) > 0')
                             .order('COUNT(favorites.id) DESC')
    @recent_recipes = Recipe.order(created_at: :desc)
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = current_user.recipes.create(recipe_params)
    if @recipe.save
      redirect_to @recipe, notice: 'レシピが正常に投稿されました'
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    redirect_to root_path, notice: 'レシピが正常に削除されました'
  end

  def my_recipes
    @recipes = current_user.recipes
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :description, :cooking_time, :image)
  end
end
