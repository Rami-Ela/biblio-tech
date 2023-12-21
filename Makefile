# Run pm2 without the yarn subshell which exports PATH entries not available
# for pm2 script to use which break the start
PM2		= `yarn bin pm2`
NAMESPACE	= $(shell basename $(CURDIR))

ifndef POSTGRES_USER
export POSTGRES_USER=postgres
endif

ifndef POSTGRES_DB
export POSTGRES_DB=local_db
endif

include .env

ifndef OPEN_BROWSER_ON_STARTUP
override OPEN_BROWSER_ON_STARTUP = false
endif

ifndef PM2_HOME
export PM2_HOME=.pm2
endif

.DEFAULT_GOAL := help
.PHONY: help
# How to use help comments
# ## [Section]
# [target]: [dependancies] ## Target description

help:
	@echo "Life is fun"
	@grep -E '(^[a-zA-Z0-9_\-\.]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'


##
## -----------------------------
##              Run
## -----------------------------
##

.PHONY: start stop restart

start: db.start ## Start database and Next instance
	$(PM2) start --namespace $(NAMESPACE)
	@${OPEN_BROWSER_ON_STARTUP} && open 'http://localhost:3000' || true

stop: db.stop ## Stop and delete projet containers
	$(PM2) stop all

delete: db.down
	$(PM2) delete all

restart: stop start ## Stop and start

##
## -----------------------------
##           Database
## -----------------------------
##

.PHONY:  db.start db.stop db.reset db.migrate db.apply db.generate db.fixtures db.script db.studio db.connect

db.start: ## Start the database container
	docker-compose up -d postgres

db.stop: ## Stop the database container
	docker-compose stop postgres

db.down: ## Remove the database container (keep the external volume with data)
	docker-compose down postgres

db.reset: ## Reset the database state
	yarn prisma migrate reset -f

db.migrate: ## Generate a new migration
	sh prisma/db-migration-generate.sh

db.apply: ## Apply all migrations
	yarn prisma migrate deploy

db.generate: db.apply ## Generate the Prisma client
	yarn prisma generate dev

db.fixtures: db.reset ## Apply all SQL fixtures to your database
	cat ./fixtures/*.sql | npx prisma db execute --stdin

db.script: ## Pipe a SQL script into your database
	docker-compose exec -T postgres psql -U $(POSTGRES_USER) $(POSTGRES_DB)

db.studio: ## Show the Prisma Studio interface in your browser
	yarn prisma studio

db.connect: ## Open the postgres cli in the terminal
	docker-compose exec postgres psql -U $(POSTGRES_USER) $(POSTGRES_DB)

