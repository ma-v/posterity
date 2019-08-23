class RemovePricefromOrders < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :price

  end
end
