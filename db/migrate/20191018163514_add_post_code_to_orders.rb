class AddPostCodeToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :post_code, :string
  end
end
