#!/bin/bash

# Script to regenerate the master projects.yaml after manual edits

echo "🔄 Regenerating projects.yaml..."
python scripts/project/regenerate_projects_yaml.py

if [ $? -eq 0 ]; then
    echo "✅ Successfully updated 'projects/projects.yaml'"
else
    echo "❌ Failed to update 'projects.yaml'"
fi
