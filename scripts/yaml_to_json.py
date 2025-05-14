import yaml
import json
import os
import sys  


# this script loads a yaml file and converts it to json
# user inputs the yaml file path and within the same folder as the yaml file, the script will create a json file with the same name as the yaml file but with .json extension
def convert_yaml_to_json(yaml_file_path):
    # Check if the file exists
    if not os.path.isfile(yaml_file_path):
        print(f"File {yaml_file_path} does not exist.")
        return

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


# get user input from sys.argv

if len(sys.argv) < 2:
    print("Usage: python yaml_to_json.py <yaml_file_path>")
elif len(sys.argv) == 2:
    yaml_file_path = sys.argv[1]
    convert_yaml_to_json(yaml_file_path)
else:
    print("Usage: python yaml_to_json.py <yaml_file_path>")
    print("Too many arguments provided.")
