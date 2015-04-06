class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.integer :score
      t.integer :game_id
      t.integer :user_id

      t.timestamps
    end

    add_index :plays, [:game_id, :user_id]
  end
end
