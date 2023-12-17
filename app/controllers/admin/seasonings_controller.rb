class Admin::SeasoningsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin
  before_action :set_seasoning, only: [:edit, :update, :destroy]

  def index
    @seasonings = Seasoning.all
  end

  def new
    @seasoning = Seasoning.new
  end

  def create
    @seasoning = Seasoning.new(seasoning_params)
    if @seasoning.save
      redirect_to admin_seasonings_path, notice: "調味料を追加しました"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @seasoning.update(seasoning_params)
      redirect_to admin_seasonings_path, notice: "調味料を更新しました"
    else
      render :edit
    end
  end

  def destroy
    @seasoning.destroy
    redirect_to admin_seasonings_path, notice: "調味料を削除しました"
  end

  private

  def check_admin
    redirect_to(root_path, alert: "アクセス権限がありません") unless current_user.admin?
  end

  private

  def set_seasoning
    @seasoning = Seasoning.find(params[:id])
  end

  def seasoning_params
    params.require(:seasoning).permit(:name)
  end
end
