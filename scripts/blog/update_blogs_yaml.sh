#!/bin/bash

# Script to regenerate the master blogs.yaml after manual edits

echo "🔄 Regenerating blogs.yaml..."
python scripts/blog/regenerate_blogs_yaml.py

if [ $? -eq 0 ]; then
    echo "✅ Successfully updated 'blogs/blogs.yaml'"
else
    echo "❌ Failed to update 'blogs.yaml'"
fi
