class PhotoUploader < CarrierWave::Uploader::Base
  storage :fog              
end