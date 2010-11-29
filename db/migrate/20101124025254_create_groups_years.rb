class CreateGroupsYears < ActiveRecord::Migration
  def self.up
    create_table :groups_years, :id => false do |t|
      t.integer :group_id
      t.integer :year_id

      t.timestamps
    end
  end

  def self.down
    drop_table :groups_years
  end
end
