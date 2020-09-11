class ArticleImageUploader < BaseUploader
  def store_dir
    "i/"
  end

  def filename
    "#{Array.new(20) { rand(36).to_s(36) }.join}.#{file.extension}" if original_filename.present?
    # "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end
