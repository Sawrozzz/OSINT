class OsintProcessorService
    ADAPTERS = [
      Social::GithubAdapter,
      # Social::RedditAdapter,
      Technical::WhoisAdapter,
      Technical::DnsDumpsterAdapter,
      News::NewsAdapter
    ].freeze

    def self.call(search_id)
      search = Search.find(search_id)
      search.update!(status: "processing")

      raw_results = []

      ADAPTERS.each do |adapter_class|
        begin
          results = adapter_class.new(search.query, search.target_type).fetch
          raw_results.concat(results)
        rescue => e
          Rails.logger.error "Adapter #{adapter_class} failed: #{e.message}"
        end
      end

      analyzed_results = Osint::AnalysisService.process(raw_results, search.query)

      analyzed_results.each do |res_data|
        search.results.create!(res_data)
      end

      search.update!(status: "completed")
    rescue => e
      search.update!(status: "failed")
      raise e
    end
end
