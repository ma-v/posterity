class AddLockedAtToAdmin < ActiveRecord::Migration[5.2]
  def change
  	add_column :admins, :locked_at, :datetime
  end
end
