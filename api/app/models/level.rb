class Level < ActiveRecord::Base
  validates :question, presence: true
  validates :game, presence: true

  belongs_to :game, inverse_of: :levels
  has_many :answers, dependent: :destroy, inverse_of: :level

  accepts_nested_attributes_for :answers
end
