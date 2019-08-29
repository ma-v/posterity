class AddMapSkuToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :map_sku, :string
  end
end
