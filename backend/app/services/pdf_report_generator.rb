require "prawn"
require "prawn/table"

class PdfReportGenerator
  def self.generate(search_id)
    search = Search.find(search_id)
    results_by_category = search.results.group_by(&:category)

    font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold_font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

    Prawn::Document.new(margin: 40) do |pdf|
      # ===== FONT SETUP =====
      if File.exist?(font_path)
        pdf.font_families.update("DejaVu" => {
          normal: font_path,
          bold: bold_font_path
        })
        pdf.font "DejaVu"
      end

      # ===== HEADER =====
      pdf.fill_color "111827"
      pdf.text "OSINT INTELLIGENCE REPORT", size: 20, style: :bold, align: :center

      pdf.move_down 8
      pdf.fill_color "6B7280"
      pdf.text "Target: #{search.query} (#{search.target_type.capitalize})", size: 11, align: :center
      pdf.text "Generated: #{Time.current.strftime('%B %d, %Y %H:%M')}", size: 10, align: :center

      pdf.move_down 15
      pdf.stroke_color "D1D5DB"
      pdf.stroke_horizontal_rule
      pdf.move_down 20

      # ===== CONTENT =====
      results_by_category.each do |category, results|
        # Avoid category split awkwardly
        pdf.start_new_page if pdf.cursor < 100

        # Category Header
        pdf.fill_color "065F46"
        pdf.text category.upcase, size: 14, style: :bold
        pdf.move_down 10

        results.each do |result|
          # Prevent breaking in weird places
          pdf.start_new_page if pdf.cursor < 120

          # --- Card Header ---
          pdf.fill_color "111827"
          pdf.text "Source: #{result.source}", size: 11, style: :bold

          pdf.fill_color "6B7280"
          pdf.text "Confidence: #{(result.confidence_score * 100).to_i}% | Relevance: #{result.relevance_level}", size: 9

          pdf.move_down 6

          # --- Table ---
          table_data = [["Field", "Value"]] + result.data.map do |key, value|
            [
              key.to_s.humanize,
              value.to_s.encode("UTF-8", invalid: :replace, undef: :replace, replace: "?")
            ]
          end

          pdf.table(table_data, width: pdf.bounds.width, header: true) do
            row(0).background_color = "E5E7EB"
            row(0).font_style = :bold

            rows(1..-1).each_with_index do |row, i|
              row.background_color = i.even? ? "FFFFFF" : "F9FAFB"
            end

            cells.border_width = 0.3
            cells.border_color = "D1D5DB"
            cells.padding = 5

            columns(0).width = 130
          end

          pdf.move_down 12

          # subtle divider between records
          pdf.stroke_color "F3F4F6"
          pdf.stroke_horizontal_rule
          pdf.move_down 12
        end

        pdf.move_down 15
      end

      # ===== FOOTER =====
      pdf.number_pages(
        "Page <page> of <total>",
        at: [pdf.bounds.right - 100, 0],
        size: 8,
        color: "9CA3AF"
      )
    end.render
  end
end