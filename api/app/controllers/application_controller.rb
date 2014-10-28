class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :authenticate

  TOKENEXPIRESIN = 2.days

  def current_user
    @current_user ||= :guest
  end

  def authenticate
    user = User.find_by(email: params[:email])

    unless user &&
      Devise.secure_compare(user.authentication_token, params[:auth_token])
      head :unauthorized
    end

    sign_in("user", user, store: false)
    @current_user = user
  end
end
