class OrdersController < ApplicationController
  before_action :set_map
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
