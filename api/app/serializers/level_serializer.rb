class LevelSerializer < ActiveModel::Serializer
  attributes :question

  has_many :answers
end
