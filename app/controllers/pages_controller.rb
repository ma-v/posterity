class PagesController < ApplicationController
  require 'rest-client'
  require 'json'
  before_action :authenticate_admin!, only: :admin_dashboard

  def home
  end

  def admin_dashboard
  	@orders = Order.all
  	@orders.sort_by {|order| order.created_at}
  	@orders.reverse
  end
end
