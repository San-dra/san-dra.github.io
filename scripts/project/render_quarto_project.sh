#!/bin/bash

# Prompt for the project name (must match folder name)
read -p "Enter the project name to render: " project_name

# Define the path to the Quarto folder
quarto_dir="projects/$project_name/quarto"

# Check if the folder exists
if [ ! -d "$quarto_dir" ]; then
    echo "❌ Quarto folder not found for '$project_name'."
    exit 1
fi

# Move into the Quarto folder and render
cd "$quarto_dir"
echo "📄 Rendering Quarto content for: $project_name"
quarto render

# Done
echo "✅ Render complete. Output at: ../content/index.html"
