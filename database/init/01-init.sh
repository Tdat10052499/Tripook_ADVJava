#!/bin/bash
# Initialize development database

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create additional databases if needed
    CREATE DATABASE tripook_test_db;
    
    -- Grant permissions
    GRANT ALL PRIVILEGES ON DATABASE tripook_dev_db TO tripook_dev_user;
    GRANT ALL PRIVILEGES ON DATABASE tripook_test_db TO tripook_dev_user;
    
    -- Create schemas
    \c tripook_dev_db;
    CREATE SCHEMA IF NOT EXISTS public;
    
    \c tripook_test_db;
    CREATE SCHEMA IF NOT EXISTS public;
    
    -- Log initialization
    \c tripook_dev_db;
    INSERT INTO pg_stat_statements_info VALUES ('Database initialized at ' || NOW());
EOSQL