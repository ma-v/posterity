class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.boolean :price
      t.string :image
      t.string :title
      t.string :last_name
      t.string :firts_name
      t.string :address

      t.timestamps
    end
  end
end
