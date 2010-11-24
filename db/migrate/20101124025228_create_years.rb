class CreateYears < ActiveRecord::Migration
  def self.up
    create_table :years do |t|
      t.integer :ue
      t.integer :after_three
      t.integer :after_two_half
      t.integer :after_two
      t.integer :after_one_half
      t.integer :after_half
      t.integer :total
      t.integer :years

      t.timestamps
    end
  end

  def self.down
    drop_table :years
  end
end
