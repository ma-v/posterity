Rails.application.routes.draw do
  devise_for :admins
  root to: 'pages#home'
  get '/admin_dashboard', to: 'pages#admin_dashboard'
  resources :orders, only: [:update]
  resources :maps, only: [:new, :create] do
  	get '/orders/confirmation', to: "orders#show"
    resources :orders, only: [:new, :create] do 
    	resources :payments, only: [:new, :create]
    end 	
  end

end
