class AddIndexToResultsData < ActiveRecord::Migration[7.2]
  def change
    add_index :results, :data, using: :gin
  end
end
