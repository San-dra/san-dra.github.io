import os
import yaml
import json

# Define blog root and output files
blogs_dir = "blogs"
output_yaml = os.path.join(blogs_dir, "blogs.yaml")
output_json = os.path.join(blogs_dir, "blogs.json")

# Define fields to extract
fields_to_keep = ["title", "excerpt", "tags", "thumbnail", "hover_gif"]

# Collect all entries
blogs_summary = []

for blog_name in os.listdir(blogs_dir):
    blog_path = os.path.join(blogs_dir, blog_name)
    yaml_file = os.path.join(blog_path, "blog.yaml")

    if os.path.isdir(blog_path) and os.path.isfile(yaml_file):
        with open(yaml_file, "r") as f:
            data = yaml.safe_load(f)

        summary = {}
        for key in fields_to_keep:
            value = data.get(key, "")

            # Prefix image paths with blog folder name
            if key in ["hover_gif", "thumbnail"] and value:
                value = f"{blog_name}/images/{os.path.basename(value)}"

            summary[key] = value

        # Fallback for slug and content
        summary["slug"] = data.get("slug", blog_name.lower().replace(" ", "-"))
        summary["content"] = f"{blog_name}/content/index.html"

        blogs_summary.append(summary)

# Write YAML and JSON outputs
with open(output_yaml, "w") as f:
    yaml.dump(blogs_summary, f, sort_keys=False)

with open(output_json, "w") as jf:
    json.dump(blogs_summary, jf, indent=2)

print(f"✅ Rebuilt {output_yaml} and {output_json} with {len(blogs_summary)} blog(s).")
