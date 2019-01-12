class User < ApplicationRecord
	has_many :user_metum
	belongs_to :role

	accepts_nested_attributes_for :user_metum
end
