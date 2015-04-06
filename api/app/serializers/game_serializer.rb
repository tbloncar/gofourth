class GameSerializer < ActiveModel::Serializer
  attributes :name, :description

  has_many :levels
end
