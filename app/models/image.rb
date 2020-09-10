class Image < ApplicationRecord
  mount_uploader :image, ArticleImageUploader

  belongs_to :article, optional: true

  # can belong to comment
end
