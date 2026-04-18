class Search < ApplicationRecord
    has_many :results, dependent: :destroy

    validates :query, presence: true

  TARGET_TYPES = %w[company individual].freeze
  validates :target_type, inclusion: { in: TARGET_TYPES }

  STATUSES = %w[queued processing completed failed].freeze
  validates :status, inclusion: { in: STATUSES }

  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= "queued"
  end
end
