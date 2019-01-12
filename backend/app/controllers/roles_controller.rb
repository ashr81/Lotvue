class RolesController < ApplicationController
	def fetch
		if params[:role_status].to_s == "active"
			@roles = Role.where(is_active: true)
		else
			@roles = Role.all
		end
		render json: @roles
	end

	def create
		Role.create!(role_params)
		render json: {status: 200}
	rescue => e
		render json: { message: e.message, status: :failed}
	end

	def update
		@role = Role.find(params[:id])
		@role.update!(role_update_params)
		render json: {status: 200}
	rescue => e
		render json: { message: e.message, status: :failed}
	end

	def destroy
	end

	private
	def role_params
		params.permit(:name)
	end

	def role_update_params
		params.permit(:is_active)
	end
end
