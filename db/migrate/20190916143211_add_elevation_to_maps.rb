class AddElevationToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :elevation, :integer
  end
end
