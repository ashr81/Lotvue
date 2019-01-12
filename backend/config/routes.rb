Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :roles, only: [:create, :update, :destroy]
  resource :users, only: [:create, :destroy]

  get 'roles/fetch', to: 'roles#fetch'
  get 'users/fetch', to: 'users#fetch'
end
