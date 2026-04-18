require "prawn"
require "prawn/table"

class PdfReportGenerator
  def self.generate(search_id)
    search = Search.find(search_id)
    results_by_category = search.results.group_by(&:category)

    font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold_font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

    Prawn::Document.new do |pdf|
      if File.exist?(font_path)
        pdf.font_families.update("DejaVu" => {
          normal: font_path,
          bold: bold_font_path
        })
        pdf.font "DejaVu"
      end

      pdf.fill_color "333333"
      pdf.text "OSINT Report By Saroj", size: 24, style: :bold
      pdf.text "Name: #{search.query} (#{search.target_type.capitalize})", size: 14
      pdf.text "Generated on: #{Time.current.strftime('%B %d, %Y %H:%M')}", size: 10
      pdf.move_down 20
      pdf.stroke_horizontal_rule
      pdf.move_down 20

      results_by_category.each do |category, results|
        pdf.fill_color "2E5984"
        pdf.text category.upcase, size: 16, style: :bold
        pdf.move_down 10
        pdf.fill_color "333333"

        results.each do |result|
          pdf.text "Source: #{result.source}", style: :bold
          pdf.text "Confidence: #{(result.confidence_score * 100).to_i}% | Relevance: #{result.relevance_level}"

          table_data = result.data.map do |key, value|
            [ key.to_s.humanize, value.to_s.encode("UTF-8", invalid: :replace, undef: :replace, replace: "?") ]
          end

          pdf.table(table_data, header: true, width: pdf.bounds.width) do
            row(0..-1).borders = [ :bottom ]
            row(0..-1).border_width = 0.5
            row(0..-1).border_color = "CCCCCC"
            cells.padding = 5
            cells.fallback_fonts = [ "DejaVu" ] if File.exist?(font_path)
          end

          pdf.move_down 15
        end
        pdf.move_down 10
      end

      pdf.number_pages "Page <page> of <total>", at: [ pdf.bounds.right - 100, 0 ], size: 8
    end.render
  end
end
