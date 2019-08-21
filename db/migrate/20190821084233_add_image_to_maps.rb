class AddImageToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :image, :string
  end
end
