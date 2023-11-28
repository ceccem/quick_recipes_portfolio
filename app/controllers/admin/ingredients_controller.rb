class Admin::IngredientsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin
  before_action :set_ingredient, only: [:edit, :update, :destroy]

  def index
    @ingredients = Ingredient.all
  end

  def new
    @ingredient = Ingredient.new
  end

  def create
    @ingredient = Ingredient.new(ingredient_params)
    if @ingredient.save
      redirect_to admin_ingredients_path, notice: "調味料を追加しました"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @ingredient.update(ingredient_params)
      redirect_to admin_ingredients_path, notice: "調味料を更新しました"
    else
      render :edit
    end
  end

  def destroy
    @ingredient.destroy
    redirect_to admin_ingredients_path, notice: "調味料を削除しました"
  end

  private

  def check_admin
    redirect_to(root_path, alert: "アクセス権限がありません") unless current_user.admin?
  end

  private

  def set_ingredient
    @ingredient = Ingredient.find(params[:id])
  end

  def ingredient_params
    params.require(:ingredient).permit(:name)
  end
end
