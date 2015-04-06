class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :label
      t.boolean :is_correct, default: false
      t.integer :level_id
      
      t.timestamps
    end

    add_index :answers, :level_id
  end
end
