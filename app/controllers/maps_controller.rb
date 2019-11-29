class MapsController < ApplicationController
	def new
	    if (@token = params[:code])

		  	@response = JSON.parse(RestClient.post("https://www.strava.com/oauth/token?client_id=38164&client_secret=0b227c9387f9b5a8ce9b9833387192004098d95c&code=#{@token}&grant_type=authorization_code", {}))
		  	@access_token = @response["access_token"]
		  	@athlete_id = @response["athlete"]["id"]
		  	# @stats = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athletes/#{@athlete_id}/stats?page=&per_page=", {Authorization: "Bearer #{@access_token}"}))
		  	# @biggest_ride = @stats["biggest_ride_distance"]

		  	@activities = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athlete/activities?per_page=100", {Authorization: "Bearer #{@access_token}"}))

				@user = User.find_or_initialize_by(strava_id: "#{@athlete_id}")
				@user.save
		  	@map = Map.new
		  	@map.orders << Order.new
	    else
	      @map =Map.new
	    end
	end

	def classics_challenge
		@user = User.find_or_initialize_by(strava_id: "Unknown")
		@user.save
		@map = Map.new
		@map.orders << Order.new
	end

	def create
		@map = Map.new(map_params)
		if map_params[:format] == "21x30cm - 25€"
      @map.price_cents = 2500
		elsif map_params[:format] == "30x45cm - 39€"
      @map.price_cents = 3900
    elsif map_params[:format] == "50x70cm - 55€"
      @map.price_cents = 5500
    end
    @map.orders.last.amount_cents = @map.price_cents
		@map.orders.last.user = User.find_by(strava_id: map_params[:strava_id])

		if @map.save
			# redirect_to new_map_order_payment_path(@map, @map.orders.last)
			render json: @map.orders.last
		else
			render :new
		end
	end

	private

	def map_params
		params.permit(:title, :image, :map_url, :format, :distance, :time, :elevation, :speed, :strava_id, orders_attributes:[:first_name, :last_name, :email, :phone, :address, :post_code, :city, :country, :map_sku, :state])
	end
end
