class PagesController < ApplicationController
  require 'rest-client'
  require 'json'
  before_action :authenticate_admin!, only: :admin_dashboard

  def home
  end

  def admin_dashboard
  	@orders = Order.all
  	# @orders.sort_by {|order_a, order_b| order_a.created_at <=> order_b.created_at}
  end
end
