import os
import sys
import yaml
import json

# Validate input
if len(sys.argv) != 2:
    print("❌ Usage: python generate_project_json.py <project_name>")
    sys.exit(1)

project_name = sys.argv[1]
project_dir = os.path.join("projects", project_name)
yaml_path = os.path.join(project_dir, "project.yaml")
output_path = os.path.join(project_dir, "project.json")

if not os.path.exists(yaml_path):
    print(f"❌ YAML file not found: {yaml_path}")
    sys.exit(1)

# Fields to include in project.json
target_fields = [
    "title", "description", "domain", "subdomain", "application_area",
    "tags", "techstack", "techicons", "gallery",
    "hover_gif", "thumbnail", "live_demo",
    "related_projects", "related_blog_posts"
]

with open(yaml_path, "r") as f:
    data = yaml.safe_load(f)

# Normalize image paths
slug = data.get("slug", project_name.lower().replace(" ", "-"))
for key in ["hover_gif", "thumbnail"]:
    if key in data and data[key]:
        data[key] = f"{project_name}/images/{os.path.basename(data[key])}"

if "gallery" in data and isinstance(data["gallery"], list):
    data["gallery"] = [f"{project_name}/images/{os.path.basename(img)}" for img in data["gallery"]]

summary = {key: data.get(key, "") for key in target_fields}
summary["slug"] = slug

with open(output_path, "w") as f:
    json.dump(summary, f, indent=2)

print(f"✅ Created {output_path}")
