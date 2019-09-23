CarrierWave.configure do |config|
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      :provider              => 'AWS',
      :aws_access_key_id     => ENV['AWS_ACCESS_KEY_ID'],
      :aws_secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
      :region                => ENV['AWS_REGION'],
      :host                  => "s3-eu-west-1.amazonaws.com",
      :endpoint              => "s3-eu-west-1.amazonaws.com"
    }

    config.fog_directory    = ENV['AWS_S3_BUCKET_NAME']
    config.fog_public       = false  # <- Private URLS (with expiration) are generated
    config.storage = :fog
end