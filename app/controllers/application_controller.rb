class ApplicationController < ActionController::Base
	def default_url_options
	  { host: ENV["DOMAIN"] || ENV["APP_HOST"] }
	end
end
