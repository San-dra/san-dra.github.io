#!/bin/bash

# ========================
# Quarto Project Generator
# Creates a new project from a template
# ========================

# 1. Ask for the project name
read -p "Enter the project name: " project_name

# 2. Create a slug (lowercase + dashes)
slug=$(echo "$project_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

# 3. Define paths
template_dir="assets/project-template"
project_dir="projects/$project_name"

# 4. Abort if folder exists
if [ -d "$project_dir" ]; then
    echo "❌ Project '$project_name' already exists at '$project_dir'."
    exit 1
fi

# 5. Copy everything from template to new project folder
cp -r "$template_dir" "$project_dir"

# 6. Update project.yaml title and slug
sed -i "s|title:.*|title: \"$project_name\"|" "$project_dir/project.yaml"
sed -i "s|slug:.*|slug: \"$slug\"|" "$project_dir/project.yaml"

# 7. Final Instructions
echo ""
echo "✅ Project '$project_name' created at '$project_dir'."
echo "📂 Edit the Quarto content under '$project_dir/quarto/index.qmd'."
echo "🛠️  Then run: 'quarto render' from inside the 'quarto' folder."
echo "📄 Your rendered page will appear at: '$project_dir/content/index.html'"

# 8. Regenerate the master projects.yaml
echo "🔄 Updating master projects.yaml..."
python scripts/regenerate_projects_yaml.py

