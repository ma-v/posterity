class Map < ApplicationRecord
	validates :image, presence: true
	validates :title, presence: true
end
