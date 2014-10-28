module API
  module V1
    class SessionsController < ::Devise::SessionsController
      respond_to :json

      skip_before_action :authenticate
      
      def create
        resource = User.find_for_database_authentication(:email => session_params[:email])
        return invalid_login_attempt unless resource
        return invalid_login_attempt unless resource.valid_password?(session_params[:password])
     
        sign_in("user", resource, store: false)
        render json: {
          success: true,
          authentication_token: resource.authentication_token,
          email: resource.email
        },
        status: :created
      end
      
      def destroy
        sign_out(resource_name)
        head :no_content
      end
     
      private def session_params
        params.require(:session).permit(:email, :password)
      end
     
      private def invalid_login_attempt
        warden.custom_failure!
        render json: {
          success: false,
          message: "Invalid email address or password"
        },
        status: :unauthorized
      end
    end
  end
end
