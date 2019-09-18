class PagesController < ApplicationController
  require 'rest-client'
  require 'json'
  before_action :authenticate_admin!, only: :admin_dashboard

  def home
  end

  def admin_dashboard
  end
end
