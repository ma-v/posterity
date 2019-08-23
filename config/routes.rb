Rails.application.routes.draw do
  root to: 'pages#home'
  resources :maps, only: [:new, :create]
  resources :orders, only: [:new, :create]
end
