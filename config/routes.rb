Rails.application.routes.draw do
  root to: 'pages#home'
  resources :maps, only: [:new, :create] do
  	get '/orders/confirmation', to: "orders#show"
    resources :orders, only: [:new, :create] do 
    	resources :payments, only: [:new, :create]
    end 	
  end

end
