require 'api_constraints'

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  #devise_for :users

  namespace :api do
    scope module: :v1, constraints: APIConstraints.new(version: 1, default: true) do
      resources :games, only: [:index]
    end
  end
end
