class AddDefaultValueToOrders < ActiveRecord::Migration[5.2]
  def change
  	change_column :orders, :shipped, :boolean, :default => false
  end
end
