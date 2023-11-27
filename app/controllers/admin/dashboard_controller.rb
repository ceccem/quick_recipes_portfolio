class Admin::DashboardController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin

  def index
  end

  private

  def check_admin
    redirect_to(root_path, alert: "アクセス権限がありません") unless current_user.admin?
  end
end
