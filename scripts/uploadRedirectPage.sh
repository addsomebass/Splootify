#!/bin/bash

aws s3 cp --profile martinaws ../auth.html s3://joevmartin.com/auth.html --acl public-read
