class AddReferencesToOrders < ActiveRecord::Migration[5.2]
  def change
    add_reference :orders, :map, foreign_key: true
  end
end
