class AddPriceToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :price, :boolean
  end
end
