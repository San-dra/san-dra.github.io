#!/bin/bash

# ==============================
# 🛠️ Create a New Project Folder
# ==============================

read -p "📦 Enter project name: " project_name
slug=$(echo "$project_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
author=$(git config user.name)
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
date_only=$(date "+%Y-%m-%d")
id_prefix="proj"
project_id="${id_prefix}_$(date +%s)_${author// /_}"

# Define paths
template_dir="assets/project-template"
project_dir="projects/$project_name"

# Abort if folder exists
if [ -d "$project_dir" ]; then
  echo "❌ Project '$project_name' already exists."
  exit 1
fi

# Copy template
cp -r "$template_dir/" "$project_dir"

# Update YAML with generated values
sed -i "s|title:.*|title: \"$project_name\"|" "$project_dir/project.yaml"
sed -i "s|slug:.*|slug: \"$slug\"|" "$project_dir/project.yaml"
sed -i "s|created_by:.*|created_by: \"$author\"|" "$project_dir/project.yaml"
sed -i "s|created_timestamp:.*|created_timestamp: \"$timestamp\"|" "$project_dir/project.yaml"
sed -i "s|project_id:.*|project_id: \"$project_id\"|" "$project_dir/project.yaml"
sed -i "s|content:.*|content: \"$slug/index.html\"|" "$project_dir/project.yaml"
sed -i "s|last_update:.*|last_update: \"$date_only\"|" "$project_dir/project.yaml"

# Final message
echo "✅ Project '$project_name' created."
echo "📁 Location: $project_dir"
echo "🛠️  Edit the content at: $project_dir/quarto/index.qmd"
echo "📄 Your content will render to: $project_dir/content/index.html"

# Optional: regenerate projects.yaml
echo "🔄 Updating master projects.yaml..."
python scripts/project/regenerate_projects_yaml.py

# ✅ Generate project-level JSON for the individual index.html
echo "🧩 Generating $project_name/project.json for dynamic content injection..."
python scripts/project/generate_project_json.py "$project_name"
