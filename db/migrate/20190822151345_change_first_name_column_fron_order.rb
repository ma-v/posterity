class ChangeFirstNameColumnFronOrder < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :firts_name, :first_name
  end
end
