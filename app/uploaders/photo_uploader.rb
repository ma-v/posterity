class PhotoUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  cloudinary_transformation :resource_type => :raw
end