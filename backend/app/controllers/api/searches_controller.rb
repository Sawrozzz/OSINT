module Api
    class SearchesController < ApplicationController
        include ActionController::MimeResponds
        def create
            search = Search.new(search_params)
            if search.save
              OsintSearchJob.perform_later(search.id)
              render json: { id: search.id, status: search.status, target_type: search.target_type, message: "Search initiated" }, status: :accepted
            else
                render json: { errors: search.errors.full_messages }, status: :unprocessable_entity
            end
        end

        def show
            search = Search.includes(:results).find(params[:id])
            render json: search.as_json(include: :results)
        end

        def destroy_all
          if Search.destroy_all
            render json: {
              status: "success",
              message: "Intelligence archive purged successfully"
            }, status: :ok
          else
            render json: { status: "error", message: "Failed to clear archive" }, status: :internal_server_error
          end
        end

        def report
            search = Search.find(params[:id])

            return render json: { error: "Search not completed" }, status: :bad_request unless search.status == "completed"

            respond_to do |format|
              format.json { render json: { message: "Specify .md or .pdf format" } }

              format.md do
                markdown = ReportGeneratorService.to_markdown(search.id)
                send_data markdown, filename: "osint-report-#{search.query}-#{search.id}.md", type: "text/markdown"
              end

              format.pdf do
                pdf_data = PdfReportGenerator.generate(search.id)
                send_data pdf_data, filename: "osint-report-##{search.query}-#{search.id}.pdf", type: "application/pdf", disposition: "attachment"
              end
            end
        end

        private

        def search_params
            params.require(:search).permit(:query, :target_type)
        end
    end
end
