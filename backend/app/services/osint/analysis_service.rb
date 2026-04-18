module Osint
class AnalysisService
    def self.process(results, target_query)
      results.map do |result|
        match_score = calculate_similarity(result[:data][:username] || "", target_query)

        risk = calculate_risk(result[:category], result[:data])

        result.merge(
          confidence_score: match_score,
          relevance_level: match_score > 0.8 ? "High" : "Medium",
          data: result[:data].merge(risk_factor: risk)
        )
      end
    end

    private

    def self.calculate_similarity(found, target)
      return 1.0 if found.downcase == target.downcase
      0.5
    end

    def self.calculate_risk(category, data)
      return "High" if category == "Technical" && data[:vulnerable]
      "Low"
    end
end
end
