class CreateSearches < ActiveRecord::Migration[7.2]
  def change
    create_table :searches do |t|
      t.string :query
      t.string :status
      t.integer :progress

      t.timestamps
    end
  end
end
