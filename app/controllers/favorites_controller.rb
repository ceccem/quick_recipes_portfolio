class FavoritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recipe

  def create
    @recipe.favorites.create(user: current_user)
    redirect_to @recipe
  end

  def destroy
    @recipe.favorites.where(user: current_user).destroy_all
    redirect_to @recipe
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end
end
