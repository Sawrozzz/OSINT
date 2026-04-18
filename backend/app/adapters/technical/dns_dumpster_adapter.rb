module Technical
    class DnsDumpsterAdapter < BaseAdapter
      API_BASE = "https://api.dnsdumpster.com/domain/"

      def fetch
        return [] unless query.include?(".") && target_type == "company"

        api_key = ENV["DNSDUMPSTER_API_KEY"]
        if api_key.blank?
          Rails.logger.error "DNSDumpster API Key missing!"
          return []
        end

        target_url = "#{API_BASE}#{query}"

        response = Faraday.get(target_url) do |req|
            req.headers["X-API-Key"] = api_key
            req.headers["Accept"] = "application/json"
            req.options.timeout = 25
          end

          unless response.success?
            Rails.logger.error "DNSDumpster API Failed: Status #{response.status} - #{response.body}"
            return []
          end

        data = JSON.parse(response.body) rescue {}
        hosts = (data["a"] || []).map do |record|
          {
            hostname: record["host"],
            ip: record["ips"]&.first&.dig("ip"),
            asn: record["ips"]&.first&.dig("asn"),
            location: record["ips"]&.first&.dig("asn_name")
          }
        end

        [
          normalize(
            source: "DNSDumpster (API)",
            category: "Technical",
            data: {
              hosts: hosts.first(15),
              mx_records: (data["mx"] || []).map { |m| m["host"] }.first(5)
            },
            confidence: 1.0
          )
        ]
      rescue => e
        Rails.logger.error "DNSDumpster API Error: #{e.message}"
        []
      end
    end
end
