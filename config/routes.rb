Rails.application.routes.draw do
  devise_for :admins
  root to: 'pages#home'
  get '/terms', to: 'pages#terms'
  get '/privacy', to: 'pages#privacy'
  get '/admin_dashboard', to: 'pages#admin_dashboard'
  get '/orders/confirmation', to: "orders#confirmation"
  resources :orders, only: [:update]
  get '/maps/classics_challenge', to: 'maps#classics_challenge'
  resources :maps, only: [:new, :create] do
    resources :orders, only: [:new, :create] do
    	resources :payments, only: [:new, :create]
    end
  end
end
