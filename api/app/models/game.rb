class Game < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :user
  has_many :levels, dependent: :destroy
end
