class AddFormatToMaps < ActiveRecord::Migration[5.2]
  def change
    add_column :maps, :format, :string
  end
end
