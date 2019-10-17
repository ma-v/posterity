class Order < ApplicationRecord
  belongs_to :map
  belongs_to :user
  monetize :amount_cents
end
