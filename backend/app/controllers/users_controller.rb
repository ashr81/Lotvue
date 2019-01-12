class UsersController < ApplicationController
	def fetch
		@users = User.order("#{params[:sortBy]} #{params[:sortOrder]}").limit(params[:perPage]).offset(params[:pageNo])
		render json: @users
	end

	def create
		User.create!(permit_params)
		render json: {status: 200}
	rescue => e
		render json: {message: e.message, status: :failed}
	end

	def destroy
	end

	private
	def permit_params
		params.permit(:first_name, :last_name, :email, :role_id, user_metum_attributes: [:entity_key, :entity_value])
	end
end
