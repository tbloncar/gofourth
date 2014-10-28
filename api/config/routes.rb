require 'api_constraints'

Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    scope module: :v1, constraints: APIConstraints.new(version: 1, default: true) do
      devise_for :users do
        post    "sessions" => "sessions#create"
        delete  "sessions" => "sessions#destroy"
      end
    end
  end
end
