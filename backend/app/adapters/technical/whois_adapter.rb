require "whois-parser"

module Technical
  class WhoisAdapter < BaseAdapter
    def fetch
      target = query.include?(".") ? query : "#{query}.com"

      begin
        record = Whois.whois(target)
        parser = record.parser

        return [] unless parser.registered?

        [
          normalize(
            source: "WHOIS",
            category: "Technical",
            data: {
              domain: target,
              registrar: parser.registrar&.name,
              created_on: parser.created_on,
              expires_on: parser.expires_on,
              nameservers: parser.nameservers.map(&:name)
            },
            confidence: 1.0
          )
        ]
      rescue => e
        Rails.logger.error "WHOIS Adapter Error for #{target}: #{e.message}"
        []
      end
    end
  end
end
