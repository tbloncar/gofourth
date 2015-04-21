class API::V1::GamesController < ApplicationController
  def index
    render json: Game.where(is_public: true)
  end

  def create
    @game = Game.new(game_params)
    @game.user = current_user

    if @game.save
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  private

  def game_params
    params.require(:game).permit(
      :name,
      :description,
      :is_public,
      levels_attributes: [
        :question,
        answers_attributes: [
          :label,
          :is_correct
        ]
      ]
    )
  end
end
