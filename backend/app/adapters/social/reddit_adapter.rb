module Social
    class RedditAdapter < BaseAdapter
      def fetch
        url = "https://www.reddit.com/search.json"

        search_query = target_type == "company" ? "\"#{query}\"" : query

        response = client(url).get("", {
          q: search_query,
          sort: "relevance",
          limit: 5
        }, { 'User-Agent': "OSINT-App/1.0 by Sawroz" })

        return [] unless response.success?

        posts = response.body.dig("data", "children") || []

        posts.map do |post|
          data = post["data"]
          confidence = calculate_confidence(data)
          normalize(
            source: "Reddit",
            category: "Social",
            data: {
              title: data["title"],
              subreddit: "r/#{data['subreddit']}",
              author: data["author"],
              text: data["selftext"]&.truncate(200),
              url: "https://reddit.com#{data['permalink']}",
              upvotes: data["ups"]
            },
          )
        end.compact
      rescue => e
        Rails.logger.error "Reddit Adapter Error: #{e.message}"
        []
      end

      private

      def calculate_confidence(data)
        title = data["title"].downcase
        body = (data["selftext"] || "").downcase
        downcased_query = query.downcase
        if title.include?(downcased_query)
            1.0
        elsif body.include?(downcased_query)
            0.7
        elsif query.split.all? { |word| title.include?(word.downcase) }
            0.4
        else
            0.1
        end
      end
    end
end
