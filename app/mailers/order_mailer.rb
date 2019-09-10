class OrderMailer < ApplicationMailer
  def confirmation
    @order = params[:order]

    mail(to: @order.email, subject: 'Your poster is on his way')
  end
end
