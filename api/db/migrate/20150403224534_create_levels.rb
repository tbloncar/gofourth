class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.text :question
      t.integer :game_id

      t.timestamps
    end

    add_index :levels, :game_id
  end
end
