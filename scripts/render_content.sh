#!/bin/bash

# ==========================
# 📄 Render Quarto Pages
# ==========================

#### STEP 1: prompt user content slug or folder name ####
read -p "📰 Enter the folder name of the content to render: " slug

#check in /blogs, /projects, /resources, /knowledge_base
# loop through root folders to find the content folder
for folder in blogs projects resources knowledge_base; do
  if [ -d "$folder/$slug" ]; then
    content_found=true
    content_dir="$folder/$slug"
    break
  fi
done


# Check if path exists
if [ ! -d "$content_dir/quarto" ]; then
  echo "❌ folder or quarto project not found in $content_dir/quarto"
  exit 1
fi

# Navigate and render
cd "$content_dir/quarto" || exit
quarto render

# Confirm render
if [ -f "../content/index.html" ]; then
  echo "✅ Rendered: $content_dir/content/index.html"
else
  echo "⚠️  Rendering failed or output file missing."
fi
