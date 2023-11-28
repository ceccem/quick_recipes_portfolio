class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_ransack_search_object

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :icon, :message])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :icon, :message])
  end

  private

  def set_ransack_search_object
    @q = Recipe.ransack(params[:q])
  end
end
