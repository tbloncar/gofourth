class Level < ActiveRecord::Base
  validates :question, presence: true
  validates :game, presence: true

  belongs_to :game
  has_many :answers, dependent: :destroy
end
