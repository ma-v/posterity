class Order < ApplicationRecord
  belongs_to :map
  monetize :amount_cents
end
