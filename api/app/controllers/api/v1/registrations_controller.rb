module API
  module V1
    class RegistrationsController < ::Devise::RegistrationsController
      respond_to :json

      skip_before_action :authenticate

      def create
        user = User.new(user_params)

        if user.save
          render json: {
            email: user.email,
            authentication_token: user.authentication_token
          }, status: :created
        else
          warden.custom_failure!
          render :json => user.errors, :status => 422
        end
      end  

      private def user_params
        params.require(:user).permit(:email, :username,
                                     :password, :password_confirmation) 
      end
    end
  end
end
