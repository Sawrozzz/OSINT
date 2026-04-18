class CreateResults < ActiveRecord::Migration[7.2]
  def change
    create_table :results do |t|
      t.references :search, null: false, foreign_key: true
      t.string :category
      t.string :source
      t.jsonb :data
      t.float :confidence_score
      t.string :relevance_level

      t.timestamps
    end
  end
end
