module News
    class NewsAdapter < BaseAdapter
      def fetch
        api_key = ENV["NEWS_API_KEY"]
        return [] if api_key.blank?

        response = client("https://newsapi.org").get("/v2/everything", {
          q: query,
          apiKey: api_key,
          pageSize: 5,
          sortBy: "relevancy"
        })

        return [] unless response.success?

        articles = response.body["articles"] || []

        articles.map do |article|
          normalize(
            source: article.dig("source", "name") || "News Outlet",
            category: "News",
            data: {
              title: article["title"],
              description: article["description"],
              url: article["url"],
              published_at: article["publishedAt"]
            },
            confidence: calculate_confidence(article["title"])
          )
        end
      rescue => e
        Rails.logger.error "NewsAPI Adapter Error: #{e.message}"
        []
      end

      private

      def calculate_confidence(title)
        # If the query name is in the headline, confidence is high
        title.downcase.include?(query.downcase) ? 0.85 : 0.4
      end
    end
end
