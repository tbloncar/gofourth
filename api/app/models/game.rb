class Game < ActiveRecord::Base
  validates :name, presence: true

  has_many :levels, dependent: :destroy
end
