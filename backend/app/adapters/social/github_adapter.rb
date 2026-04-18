module Social
    class GithubAdapter < BaseAdapter
        def fetch
            response = client("https://api.github.com").get("/search/users", { q: query })
            return [] unless response.success?

            items = response.body["items"] || []

            items.take(5).map do |user|
              normalize(
                source: "GitHub",
                category: "Social",
                data: {
                  username: user["login"],
                  profile_url: user["html_url"]
                },
                confidence: calculate_confidence(user["login"])
              )
            end
          end

          private
          def calculate_confidence(username)
            username.downcase == query.downcase ? 0.95 : 0.6
          end
    end
end
