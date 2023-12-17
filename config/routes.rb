Rails.application.routes.draw do
  namespace :admin do
    get 'dashboard', to: 'dashboard#index'
    resources :seasonings
  end
  devise_for :users
  resources :users, only: [:show]
  root to: 'homes#top'
  resources :recipes do
    resources :favorites, only: [:create, :destroy]
  end
  get 'my_recipes', to: 'recipes#my_recipes'
  get 'new_recipes', to: 'recipes#new_recipes'
  get 'popular_recipes', to: 'recipes#popular_recipes'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
