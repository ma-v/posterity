class PagesController < ApplicationController
  require 'rest-client'
  require 'json'

  def home
  end

  def callback_oauth
  	@token = params[:code]
  	@response = JSON.parse(RestClient.post("https://www.strava.com/oauth/token?client_id=38164&client_secret=0b227c9387f9b5a8ce9b9833387192004098d95c&code=#{@token}&grant_type=authorization_code", {}))
  	@access_token = @response["access_token"]
  	@athlete_id = @response["athlete"]["id"]

  	@stats = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athletes/#{@athlete_id}/stats?page=&per_page=", {Authorization: "Bearer #{@access_token}"}))
  	@biggest_ride = @stats["biggest_ride_distance"]

  	@activities = JSON.parse(RestClient.get("https://www.strava.com/api/v3/athlete/activities", {Authorization: "Bearer #{@access_token}"}))
  	@activity_id = @activities.first["id"]

  	@activity = JSON.parse(RestClient.get("https://www.strava.com/api/v3/activities/#{@activity_id}?include_all_efforts=false", {Authorization: "Bearer #{@access_token}"}))
  	@polyline = @activity["map"]["summary_polyline"]
  end
end
