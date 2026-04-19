
# Tech Stack

### Backend
- Ruby On Rails

### Database
- postgres

### Async API Handling
- sidekiq

### Frontend 
- React with typescript
- tailwind

## OPEN SOURCE API's
 1. hackernews api
 2. newsapi
 3. github api
 4. reddits api
 5. dnsdumpster api
 6. whois (gem by rails)

# OSINT Repository Structure

```
├── 📁 backend
│   ├── 📄 .dockerignore
│   ├── 📄 .gitattributes
│   ├── 📄 .gitignore
│   ├── ⚙️ .rubocop.yml
│   ├── 📄 .ruby-version
│   ├── 📁 app
│   │   ├── 📁 adapters
│   │   │   ├── 📄 base_adapter.rb
│   │   │   ├── 📁 news
│   │   │   │   ├── 📄 hacker_news_adapter.rb
│   │   │   │   └── 📄 news_adapter.rb
│   │   │   ├── 📁 social
│   │   │   │   ├── 📄 github_adapter.rb
│   │   │   │   └── 📄 reddit_adapter.rb
│   │   │   └── 📁 technical
│   │   │       ├── 📄 dns_dumpster_adapter.rb
│   │   │       └── 📄 whois_adapter.rb
│   │   ├── 📁 channels
│   │   │   └── 📁 application_cable
│   │   │       ├── 📄 channel.rb
│   │   │       └── 📄 connection.rb
│   │   ├── 📁 controllers
│   │   │   ├── 📁 api
│   │   │   │   └── 📄 searches_controller.rb
│   │   │   ├── 📄 application_controller.rb
│   │   │   └── 📁 concerns
│   │   │       └── 📄 .keep
│   │   ├── 📁 jobs
│   │   │   ├── 📄 application_job.rb
│   │   │   └── 📄 osint_search_job.rb
│   │   ├── 📁 mailers
│   │   │   └── 📄 application_mailer.rb
│   │   ├── 📁 models
│   │   │   ├── 📄 application_record.rb
│   │   │   ├── 📁 concerns
│   │   │   │   └── 📄 .keep
│   │   │   ├── 📄 result.rb
│   │   │   └── 📄 search.rb
│   │   ├── 📁 services
│   │   │   ├── 📁 osint
│   │   │   │   └── 📄 analysis_service.rb
│   │   │   ├── 📄 osint_processor_service.rb
│   │   │   ├── 📄 pdf_report_generator.rb
│   │   │   └── 📄 report_generator_service.rb
│   │   └── 📁 views
│   │       └── 📁 layouts
│   │           ├── 📄 mailer.html.erb
│   │           └── 📄 mailer.text.erb
│   ├── 📁 bin
│   │   ├── 📄 brakeman
│   │   ├── 📄 docker-entrypoint
│   │   ├── 📄 rails
│   │   ├── 📄 rake
│   │   ├── 📄 rubocop
│   │   └── 📄 setup
│   ├── 📁 config
│   │   ├── 📄 application.rb
│   │   ├── 📄 boot.rb
│   │   ├── ⚙️ cable.yml
│   │   ├── 📄 credentials.yml.enc
│   │   ├── ⚙️ database.yml
│   │   ├── 📄 environment.rb
│   │   ├── 📁 environments
│   │   │   ├── 📄 development.rb
│   │   │   ├── 📄 production.rb
│   │   │   └── 📄 test.rb
│   │   ├── 📁 initializers
│   │   │   ├── 📄 cors.rb
│   │   │   ├── 📄 filter_parameter_logging.rb
│   │   │   ├── 📄 inflections.rb
│   │   │   ├── 📄 mime_types.rb
│   │   │   └── 📄 sidekiq.rb
│   │   ├── 📁 locales
│   │   │   └── ⚙️ en.yml
│   │   ├── 📄 puma.rb
│   │   ├── 📄 routes.rb
│   │   ├── ⚙️ sidekiq.yml
│   │   └── ⚙️ storage.yml
│   ├── 📄 config.ru
│   ├── 📁 db
│   │   ├── 📁 migrate
│   │   │   ├── 📄 20260418105821_create_searches.rb
│   │   │   ├── 📄 20260418105833_create_results.rb
│   │   │   ├── 📄 20260418112331_add_index_to_results_data.rb
│   │   │   └── 📄 20260418121031_add_target_type_to_searches.rb
│   │   ├── 📄 schema.rb
│   │   └── 📄 seeds.rb
│   ├── 📄 Dockerfile
│   ├── 📄 Gemfile
│   ├── 📄 Gemfile.lock
│   ├── 📁 lib
│   │   └── 📁 tasks
│   │       └── 📄 .keep
│   ├── 📁 log
│   │   └── 📄 .keep
│   ├── 📁 public
│   │   └── 📄 robots.txt
│   ├── 📄 Rakefile
│   ├── 📝 README.md
│   ├── 📁 storage
│   │   └── 📄 .keep
│   ├── 📁 test
│   │   ├── 📁 channels
│   │   │   └── 📁 application_cable
│   │   │       └── 📄 connection_test.rb
│   │   ├── 📁 controllers
│   │   │   └── 📄 .keep
│   │   ├── 📁 fixtures
│   │   │   ├── 📁 files
│   │   │   │   └── 📄 .keep
│   │   │   ├── ⚙️ results.yml
│   │   │   └── ⚙️ searches.yml
│   │   ├── 📁 integration
│   │   │   └── 📄 .keep
│   │   ├── 📁 mailers
│   │   │   └── 📄 .keep
│   │   ├── 📁 models
│   │   │   ├── 📄 .keep
│   │   │   ├── 📄 result_test.rb
│   │   │   └── 📄 search_test.rb
│   │   └── 📄 test_helper.rb
│   ├── 📁 tmp
│   │   ├── 📄 .keep
│   │   ├── 📁 pids
│   │   │   └── 📄 .keep
│   │   └── 📁 storage
│   │       └── 📄 .keep
│   └── 📁 vendor
│       └── 📄 .keep
├── 📁 frontend
│   ├── 📄 .gitignore
│   ├── 📜 eslint.config.js
│   ├── 🌐 index.html
│   ├── 📋 package-lock.json
│   ├── 📋 package.json
│   ├── 📁 public
│   │   ├── 🖼️ favicon.svg
│   │   └── 🖼️ icons.svg
│   ├── 📝 README.md
│   ├── 📁 src
│   │   ├── ⚛️ App.tsx
│   │   ├── 📁 assets
│   │   │   ├── 🖼️ hero.png
│   │   │   ├── 🖼️ react.svg
│   │   │   └── 🖼️ vite.svg
│   │   ├── 🎨 index.css
│   │   ├── ⚛️ main.tsx
│   │   ├── 📁 pages
│   │   │   ├── ⚛️ HomePage.tsx
│   │   │   └── ⚛️ ResultsPage.tsx
│   │   ├── 📁 store
│   │   │   └── ⚡ useOsintStore.ts
│   │   ├── 📁 types
│   │   │   └── ⚡ osint.ts
│   │   └── 📁 utils
│   │       └── ⚡ formatUtils.ts
│   ├── 📋 tsconfig.app.json
│   ├── 📋 tsconfig.json
│   ├── 📋 tsconfig.node.json
│   └── ⚡ vite.config.ts
└── 📝 README.md

```

# ENV 
##### Create .env file on each folders root path.

##### Inside frontend .env file put your backend api base url
  - VITE_API_URL="(http://localhost:3000/api)"

##### Inside backend .env file put 
  - NEWS_API_KEY= <your_api_key_from_news_api>
  - DNSDUMPSTER_API_KEY=<your_api_from_dnsdumpster_api> 


# RUN LOCALLY

### Pre-Requirities 
- latest version of ruby
- lastest version of rails
- postgres db on your system
- redis on your system
- node relevent version
- npm latest version


1. Clone the Repo:
``` git clone https://github.com/Sawrozzz/OSINT.git ```

2. In one terminal, Navigate to backend directory
``` cd backend ```

3. Run these command's on multiple terminal in backend directory
``` 
bundle install
rails db:create 
rails db:migrate
rails s 
bundle exec sidekiq
```

4. And in another terminal from root folder, Navigate to frontend directory
``` cd frontend ```

5. Run this command
``` 
npm install
npm run dev 
```
