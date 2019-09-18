class OrdersController < ApplicationController
  before_action :set_map, only: [:show]
  before_action :set_order, only: [:update, :cancel_shipment]

  def show
  end

  def update
    if @order.shipped === false
      @order.shipped = true
      @order.update(order_params)
      @order.save!
      redirect_to admin_dashboard_path
    elsif @order.shipped === true
      @order.shipped = false
      @order.tracking_number = nil
      @order.save!
      redirect_to admin_dashboard_path
    end
  end

  def cancel_shipment
  end

  private

  def set_map
    @map = Map.find(params[:map_id])
  end

  def set_order
    @order = Order.find(params[:id])
  end

  def order_params
    params.require(:order).permit(:first_name, :last_name, :address, :image, :price, :tracking_number)
  end
end
