class OrdersController < ApplicationController

  def new
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)

  end

  private
  def order_params
    params.require(:order).permit(:first_name, :last_name, :address, :image, :price )
  end
end
