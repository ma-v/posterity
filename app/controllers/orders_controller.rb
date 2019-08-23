class OrdersController < ApplicationController
  before_action :set_map
  def new
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)
    @order.map = @map
    if @order.save
      redirect_to map_orders_confirmation_path
    else
      render :new
    end
  end

  def show
  end

  private
  def set_map
    @map = Map.find(params[:map_id])
  end
  def order_params
    params.require(:order).permit(:first_name, :last_name, :address, :image, :price)
  end
end
