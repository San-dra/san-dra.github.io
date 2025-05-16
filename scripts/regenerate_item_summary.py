#this script regenerates the item summary files for blogs, projects, resources, and knowledge base (unit) in the specified item directories.
# it scans each folder in the specified directories for the corresponding yaml files,   
# then regenerates the item summary files for each blog, project, resource, and knowledge base (unit) in the specified directories.

import os
import sys
import yaml
import json
from datetime import datetime



# Define blog root and yaml files to scan
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
    

#loop through the selected content root and find the list of folders with the yaml files
# folder list will contain blogs/folder-name, projects/folder-name, resources/folder-name, knowledge_base/folder-name
folder_list = []

#generate the folder list with the yaml files
for root, yaml_filename in content_roots.items():
    root_dir = root
    for folder in os.listdir(root_dir):
        folder_path = os.path.join(root_dir, folder)
        if os.path.isdir(folder_path):
            yaml_file_path = os.path.join(folder_path, yaml_filename)
            if os.path.isfile(yaml_file_path):
                folder_list.append(folder_path)
            


for folder in folder_list:
    # generate a json file for each folder
    folder_name = os.path.basename(folder)
    # yaml file path will be folder/blog.yaml, folder/project.yaml, folder/resource.yaml, folder/unit.yaml
    yaml_file_path = os.path.join(folder, content_roots[os.path.basename(os.path.dirname(folder))])

    output_json = os.path.join(folder, f"{folder_name}.json")
    # Load the YAML file
    with open(yaml_file_path, 'r') as yaml_file:
        data = yaml.safe_load(yaml_file)

    # Convert to JSON format
    json_data = json.dumps(data, indent=4)

    # Create the JSON file path
    json_file_path = os.path.splitext(yaml_file_path)[0] + '.json'

    # Write the JSON data to a file
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)

    print(f"Converted {yaml_file_path} to {json_file_path}")