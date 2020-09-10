class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.references :article, foreign_key: true
      t.string :source_url
      t.string :image

      t.timestamps
    end
  end
end
