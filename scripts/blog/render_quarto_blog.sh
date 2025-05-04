#!/bin/bash

# ==========================
# 📄 Render Quarto Blog Page
# ==========================

read -p "📝 Enter the blog title: " blog_title
blog_dir="blogs/$blog_title"

# Check if path exists
if [ ! -d "$blog_dir/quarto" ]; then
  echo "❌ Blog folder or quarto project not found in $blog_dir/quarto"
  exit 1
fi

# Navigate and render
cd "$blog_dir/quarto" || exit
quarto render

# Confirm render
if [ -f "../content/index.html" ]; then
  echo "✅ Rendered: $blog_dir/content/index.html"
else
  echo "⚠️  Rendering failed or output file missing."
fi
