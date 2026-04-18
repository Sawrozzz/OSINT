# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2026_04_18_121031) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "results", force: :cascade do |t|
    t.bigint "search_id", null: false
    t.string "category"
    t.string "source"
    t.jsonb "data"
    t.float "confidence_score"
    t.string "relevance_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data"], name: "index_results_on_data", using: :gin
    t.index ["search_id"], name: "index_results_on_search_id"
  end

  create_table "searches", force: :cascade do |t|
    t.string "query"
    t.string "status"
    t.integer "progress"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "target_type"
  end

  add_foreign_key "results", "searches"
end
