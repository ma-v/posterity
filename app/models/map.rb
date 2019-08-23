class Map < ApplicationRecord
	validates :image, presence: true
	validates :title, presence: true
  has_many :orders
end
