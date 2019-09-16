class AddDistanceToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :distance, :integer
  end
end
