Rails.application.routes.draw do
  root to: 'pages#home'
  get "callback_oauth", to: "pages#callback_oauth"
end
