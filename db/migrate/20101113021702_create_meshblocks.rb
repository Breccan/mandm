class CreateMeshblocks < ActiveRecord::Migration
  def self.up
    create_table :meshblocks do |t|
      t.integer :meshblock
      t.integer :cau
      t.integer :deprivation
      t.integer :deprivation_score
      t.integer :population

      t.timestamps
    end
  end

  def self.down
    drop_table :meshblocks
  end
end
