class Play < ActiveRecord::Base
  validates :score, presence: true
  validates :game, presence: true
  validates :user, presence: true

  belongs_to :game
  belongs_to :user
end
