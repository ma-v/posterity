class AddSpeedToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :speed, :integer
  end
end
