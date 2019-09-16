class AddTimeToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :time, :integer
  end
end
