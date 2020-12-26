<?php
// Define PostgreSQL database server connect parameters.
define('PG_HOST', 'ec2-100-25-231-126.compute-1.amazonaws.com');
define('PG_PORT', 5432);
define('PG_DATABASE', 'd1lm3ujhf1056o');
define('PG_USER', 'cbrfuqnvzzklyj');
define('PG_PASSWORD', '7c531185da73414f5e7ce5176fef7cf1d29161dfdf8a5451723d7e65b046ad27');
define('ERROR_ON_CONNECT_FAILED', 'Connection failed!');

// Merge connect string and connect db server with default parameters.
function getDB() {
    return pg_pconnect (' host=' . PG_HOST .
                        ' port=' . PG_PORT .
                        ' dbname=' . PG_DATABASE .
                        ' user=' . PG_USER .
                        ' password=' . PG_PASSWORD
                       ) or die (ERROR_ON_CONNECT_FAILED);
}
?>