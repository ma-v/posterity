class RemovePriceFromMaps < ActiveRecord::Migration[5.2]
  def change
    remove_column :maps, :price, :integer
  end
end
