class AddPriceToMaps < ActiveRecord::Migration[5.2]
  def change
  	add_monetize :maps, :price, currency: { present: false }
  end
end
