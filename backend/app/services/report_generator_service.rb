class ReportGeneratorService
    def self.to_markdown(search_id)
      search = Search.includes(:results).find(search_id)

      report = <<~MARKDOWN
        # OSINT Investigation Report
        **Target:** #{search.query}
        **Generated:** #{search.updated_at.strftime('%Y-%m-%d %H:%M')}
        ---

      MARKDOWN

      search.results.group_by(&:category).each do |category, results|
        report << "## #{category}\n"
        results.each do |res|
          report << "### Source: #{res.source} (Confidence: #{res.relevance_level})\n"
          report << "- **Details:** #{res.data.except('avatar')}\n"
        end
        report << "\n"
      end

      report
    end
end
