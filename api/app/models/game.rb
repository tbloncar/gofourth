class Game < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :user
  has_many :levels, dependent: :destroy, inverse_of: :game

  accepts_nested_attributes_for :levels
end
