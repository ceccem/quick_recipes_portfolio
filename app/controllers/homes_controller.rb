class HomesController < ApplicationController
  def top
    @recipes = Recipe.all
    @random_recipes = Recipe.order("RANDOM()").limit(4)
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

  private

  def recipe_params
    params.require(:recipe).permit(:title, :description, :cooking_time, :image)
  end
end
