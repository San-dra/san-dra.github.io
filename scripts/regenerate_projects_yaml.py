import os
import yaml
import json  # Add at the top of your script if not already


# Define project root and output file
projects_dir = "projects"
output_file = os.path.join(projects_dir, "projects.yaml")

# Define fields to extract
fields_to_keep = ["title", "highlight", "description", "domain", "techicons", "hover_gif", "thumbnail", "live_demo"]


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
            if key in ["hover_gif", "thumbnail"] and value:
                value = f"{project_name}/images/{os.path.basename(value)}"

            summary[key] = value

        # Fallback for slug
        summary["slug"] = data.get("slug", project_name.lower().replace(" ", "-"))

        projects_summary.append(summary)

# Write all to projects.yaml
with open(output_file, "w") as f:
    yaml.dump(projects_summary, f, sort_keys=False)


print(f"✅ Rebuilt {output_file} with {len(projects_summary)} project(s).")


# Write JSON file for frontend
with open(os.path.join(projects_dir, "projects.json"), "w") as jf:
    json.dump(projects_summary, jf, indent=2)

