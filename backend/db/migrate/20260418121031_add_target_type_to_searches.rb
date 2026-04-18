class AddTargetTypeToSearches < ActiveRecord::Migration[7.2]
  def change
    add_column :searches, :target_type, :string
  end
end
