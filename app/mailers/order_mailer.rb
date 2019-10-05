class OrderMailer < ApplicationMailer
  def confirmation
    @order = params[:order]

    mail(to: @order.email, subject: 'Order confirmation - Posterity')
  end

  def shipment 
  	@order = params[:order]

  	mail(to: @order.email, subject: 'Your poster is on its way')
  end
end
