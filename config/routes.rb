Rails.application.routes.draw do
  devise_for :admins
  root to: 'pages#home'
  get '/admin_dashboard', to: 'pages#admin_dashboard'
  get '/orders/confirmation', to: "orders#confirmation"
  resources :orders, only: [:update]
  resources :maps, only: [:new, :create] do
    resources :orders, only: [:new, :create] do 
    	resources :payments, only: [:new, :create]
    end 	
  end

end
