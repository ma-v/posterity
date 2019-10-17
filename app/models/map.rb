class Map < ApplicationRecord
  has_many :orders
  monetize :price_cents
  attr_accessor :strava_id

  accepts_nested_attributes_for :orders
  mount_uploader :image, PhotoUploader
end
