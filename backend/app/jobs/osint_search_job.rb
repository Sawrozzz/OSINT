class OsintSearchJob < ApplicationJob
    queue_as :default

    def perform(search_id)
      OsintProcessorService.call(search_id)
    rescue StandardError => e
      search = Search.find(search_id)
      search&.update(status: "failed")
      raise e
    end
end
