module News
    class HackerNewsAdapter < BaseAdapter
      def fetch
        response = client("https://hn.algolia.com").get("/api/v1/search", {
          query: query,
          tags: "(story,comment)",
          hitsPerPage: 10
        })

        return [] unless response.success?

        hits = response.body["hits"] || []

        hits.map do |hit|
          normalize(
            source: "Hacker News",
            category: "News",
            data: {
              title: hit["title"] || "Comment on: #{hit['story_title']}",
              author: hit["author"],
              points: hit["points"] || 0,
              comment_count: hit["num_comments"] || 0,
              description: clean_text(hit["comment_text"] || hit["story_text"] || ""),
              url: hit["url"] || "https://news.ycombinator.com/item?id=#{hit['objectID']}",
              published_at: hit["created_at"]
            },
            confidence: calculate_confidence(hit["title"] || "")
          )
        end
      rescue => e
        Rails.logger.error "Hacker News Adapter Error: #{e.message}"
        []
      end

      private

      def calculate_confidence(title)
        title.downcase.include?(query.downcase) ? 0.9 : 0.6
      end

      def clean_text(html)
        return "No content available." if html.blank?
        ActionController::Base.helpers.strip_tags(html).truncate(200)
      end
    end
end
