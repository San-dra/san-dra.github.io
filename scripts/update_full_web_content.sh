#!/bin/bash

# ==============================
# 📝 Update Full Website Content
# ==============================

# STEP 1: Regenerate the content summary in each of the content folders
# This will update the content summary in each of the content folders
# run regenerate_content_summary.sh script by using update as the argument

python scripts/regenerate_content_summary.py update


# STEP 2: Regenerate the home yaml file
# This will update the home.yaml file in the root folder
python scripts/regenerate_home_yaml.py