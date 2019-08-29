class AddEmailToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :email, :string
  end
end
