class MapsController < ApplicationController
	def new
	    if (@token = params[:code])

		  	@response = JSON.parse(RestClient.post("https://www.strava.com/oauth/token?client_id=38164&client_secret=0b227c9387f9b5a8ce9b9833387192004098d95c&code=#{@token}&grant_type=authorization_code", {}))
		  	@access_token = @response["access_token"]
		  	@athlete_id = @response["athlete"]["id"]

		  	@stats = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athletes/#{@athlete_id}/stats?page=&per_page=", {Authorization: "Bearer #{@access_token}"}))
		  	@biggest_ride = @stats["biggest_ride_distance"]

		  	@activities = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athlete/activities", {Authorization: "Bearer #{@access_token}"}))
		  	@activity_id = @activities.first["id"]

		  	@activity = JSON.parse(RestClient.get("https://www.strava.com/api/v3/activities/#{@activity_id}?include_all_efforts=false", {Authorization: "Bearer #{@access_token}"}))
		  	@polyline = @activity["map"]["summary_polyline"]

		  	@map = Map.new
		  	@map.orders << Order.new
	    else
	      @map =Map.new
	    end
	end

	def create
		puts map_params.inspect
		@map = Map.new(map_params)

	    if map_params[:format] == "A3 - 39€"
	      @map.price_cents = 3900
	    elsif map_params[:format] == "A2 - 59€"
	      @map.price_cents = 5900
	    end
	    @map.orders.last.amount_cents = @map.price_cents

		if @map.save
			# redirect_to new_map_order_payment_path(@map, @map.orders.last)
			render json: @map.orders.last
		else
			render :new
		end
	end

	private

	def map_params
		params.permit(:title, :image, :format, orders_attributes:[:first_name, :last_name, :address, :map_sku, :state, :email])
	end
end
