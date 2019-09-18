class AddTrackingNumberToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :tracking_number, :string
  end
end
