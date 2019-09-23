class PhotoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick #
  
  def extension_whitelist
    %w(pdf PDF)
  end            
end