require "faraday"

class BaseAdapter
    attr_reader :query, :target_type, :options

    def initialize(query, target_type, options = {})
    @query = query
    @target_type = target_type
    @options = options
  end

  def fetch
    raise NotImplementedError, "Subclasses must implement fetch"
  end

  protected

  def client(url)
    Faraday.new(url: url) do |f|
      f.request :json
      f.response :json
      f.adapter Faraday.default_adapter
    end
  end

  def normalize(source:, category:, data:, confidence: 0.5)
    {
      source: source,
      category: category,
      data: data,
      confidence_score: confidence,
      relevance_level: assign_relevance(confidence)
    }
  end

  private

  def assign_relevance(score)
    return "High" if score >= 0.8
    return "Medium" if score >= 0.5
    "Low"
  end
end
