class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.text :description
      t.boolean :is_public, default: false
      t.integer :user_id

      t.timestamps
    end
  end
end
