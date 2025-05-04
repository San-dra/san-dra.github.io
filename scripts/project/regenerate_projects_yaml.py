import os
import yaml
import json

# Define project root and output file
projects_dir = "projects"
output_file = os.path.join(projects_dir, "projects.yaml")
output_json = os.path.join(projects_dir, "projects.json")

# Define fields to extract
fields_to_keep = [
    "title", "highlight", "project_type", "project_repo",
    "description", "domain", "subdomain", "application_area", "tags",
    "techstack", "techicons",
    "gallery", "hover_gif", "thumbnail", "live_demo"
]

# Collect all entries
projects_summary = []

for project_name in os.listdir(projects_dir):
    project_path = os.path.join(projects_dir, project_name)
    yaml_file = os.path.join(project_path, "project.yaml")

    if os.path.isdir(project_path) and os.path.isfile(yaml_file):
        with open(yaml_file, "r") as f:
            data = yaml.safe_load(f)

        summary = {}
        for key in fields_to_keep:
            value = data.get(key, "")

            # Prefix image paths with project folder name
            if key in ["hover_gif", "thumbnail"] and isinstance(value, str):
                value = f"{project_name}/images/{os.path.basename(value)}"

            if key == "gallery" and isinstance(value, list):
                value = [f"{project_name}/images/{os.path.basename(img)}" for img in value]

            summary[key] = value

        # Fallback for slug
        summary["slug"] = data.get("slug", project_name.lower().replace(" ", "-"))

        projects_summary.append(summary)

# Write YAML output
with open(output_file, "w") as f:
    yaml.dump(projects_summary, f, sort_keys=False)

# Write JSON output
with open(output_json, "w") as jf:
    json.dump(projects_summary, jf, indent=2)

print(f"✅ Rebuilt {output_file} and {output_json} with {len(projects_summary)} project(s).")
