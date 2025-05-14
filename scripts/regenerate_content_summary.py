#this script regenerates the content summary files for blogs, projects, resources, and knowledge base (unit) in the specified directories.
# it scans each folder in the specified directories for the corresponding yaml files,   
# loads the data, and appends it to a list.
# it then writes the list to a single yaml file and a json file in the root directory.

import os
import sys
import yaml
import json
from datetime import datetime



# Define blog root and yaml files to merge
# looks for all blog.yaml inside each folder in blogs/, 
content_roots = {
    "blogs": "blog.yaml",
    "projects": "project.yaml",
    "resources": "resource.yaml",
    "knowledge_base": "unit.yaml"
}

# this function used to clean the data for json
# convert datetime objects to iso format and remove any non-serializable data
# none serializable: datetime, set, bytes, etc.

def sanitize_for_json(data):
    if isinstance(data, dict):
        return {k: sanitize_for_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_for_json(i) for i in data]
    elif isinstance(data, datetime):
        return data.isoformat()
    else:
        return data
    
## Check if the script is run with the correct argument and set the content_roots accordingly 
if len(sys.argv) < 2:
    print("❌ Missing argument. Use one of: [1 = blog, 2 = project, 3 = resource, 4 = knowledge_base (unit)]")
    sys.exit(1)
elif sys.argv[1] == "blog":
    content_roots = {key: value for key, value in content_roots.items() if key == 'blogs'}
elif sys.argv[1] == "project":
    content_roots = {key: value for key, value in content_roots.items() if key == 'projects'}
elif sys.argv[1] == "resource":  
    content_roots = {key: value for key, value in content_roots.items() if key == 'resources'}
elif sys.argv[1] == "knowledge_base":
    content_roots = {key: value for key, value in content_roots.items() if key == 'knowledge_base'}
elif sys.argv[1] == "update":
    content_roots = {key: value for key, value in content_roots.items() }
else:
    print("❌ Unknown content type. Use one of: [1 = blog, 2 = project, 3 = resource, 4 = knowledge_base (unit)]")
    sys.exit(1)




# Loop through selected content root
for root, yaml_filename in content_roots.items():
    root_dir = root
    output_yaml = os.path.join(root_dir, f"{root}.yaml")
    output_json = os.path.join(root_dir, f"{root}.json")

    print(f"\n Scanning {root_dir}...")

    folders = [f for f in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, f))]
    content_summary = []

    for folder in folders:
        yaml_path = os.path.join(root_dir, folder, yaml_filename)
        if os.path.isfile(yaml_path):
            with open(yaml_path, "r") as f:
                try:
                    data = yaml.safe_load(f)
                    content_summary.append(data)
                except Exception as e:
                    print(f"  ⚠️ Skipped {yaml_path} — YAML error: {e}")
        else:
            print(f"  ⚠️ Missing {yaml_filename} in {folder}, skipping.")

    #  Write output YAML
    with open(output_yaml, "w") as yout:
        yaml.dump(content_summary, yout, sort_keys=False)
        print(f"Regenerated: {output_yaml}")

    # write output JSON
    with open(output_json, "w") as jout:
        json.dump(sanitize_for_json(content_summary), jout, indent=2)
        print(f"Regenerated: {output_json}")
