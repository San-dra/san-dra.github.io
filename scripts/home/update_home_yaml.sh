#!/bin/bash

# 🔄 Regenerate home.yaml by combining highlighted projects and latest blogs

echo "Updating home.yaml..."
python scripts/home/regenerate_home_yaml.py

if [ $? -eq 0 ]; then
  echo "✅ home.yaml updated."
else
  echo "❌ Failed to update home.yaml."
fi
