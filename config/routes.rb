Rails.application.routes.draw do
  root to: 'pages#home'
  resources :maps, only: [:new, :create] do
    resources :orders, only: [:new, :create]
  get '/orders/confirmation', to: "orders#show"

  end
end
