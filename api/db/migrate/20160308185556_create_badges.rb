class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.references :person
      t.string :title
      t.integer :vote_count
      t.timestamps null: false
    end
  end
end
