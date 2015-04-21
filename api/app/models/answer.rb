class Answer < ActiveRecord::Base
  validates :label, presence: true
  validates :level, presence: true

  belongs_to :level, inverse_of: :answers
end
