#!/bin/bash

# ========================
# 📝 Blog Post Generator
# ========================

read -p "📰 Enter blog post title: " blog_title
slug=$(echo "$blog_title" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

# Escape variables for sed
blog_title=$(printf '%s' "$blog_title" | sed 's/[&/]/\\&/g')
blog_slug=$(printf '%s' "$slug" | sed 's/[&/]/\\&/g')
safe_banner=$(printf '%s/images/banner.png' "$blog_title" | sed 's/[&/]/\\&/g')

# Paths
template_dir="assets/blog-template"
blog_dir="blogs/$blog_title"

if [ -d "$blog_dir" ]; then
  echo "❌ Blog '$blog_title' already exists."
  exit 1
fi

cp -r "$template_dir" "$blog_dir"

# Update blog.yaml
sed -i "s|title:.*|title: \"$safe_title\"|" "$blog_dir/blog.yaml"
sed -i "s|slug:.*|slug: \"$safe_slug\"|" "$blog_dir/blog.yaml"
sed -i "s|banner:.*|banner: \"$safe_banner\"|" "$blog_dir/blog.yaml"

# Update _quarto.yml
quarto_yaml="$blog_dir/quarto/_quarto.yml"
sed -i "s|\{\{ blog_title \}\}|$safe_title|g" "$quarto_yaml"

# Final output
echo "✅ Blog '$blog_title' created at '$blog_dir'"
echo "🛠️  Edit: $blog_dir/quarto/index.qmd"
echo "📄 Then run 'quarto render' inside the 'quarto' folder"
echo "🔄 Updating blogs.yaml..."
python scripts/blog/regenerate_blogs_yaml.py