class Result < ApplicationRecord
  belongs_to :search

  validates :category, :source, :data, presence: true
  # Helper to filter by confidence in the UI
  scope :high_confidence, -> { where("confidence_score >= 0.8") }
end
