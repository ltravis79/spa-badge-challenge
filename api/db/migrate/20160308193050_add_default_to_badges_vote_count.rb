class AddDefaultToBadgesVoteCount < ActiveRecord::Migration
  def change
    change_column :badges, :vote_count, :integer, default: 0
  end
end
