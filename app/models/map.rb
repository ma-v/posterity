class Map < ApplicationRecord
  validates :title, presence: true
  has_many :orders

  accepts_nested_attributes_for :orders
  mount_uploader :image, PhotoUploader
end
