import os
import yaml
import json
from datetime import datetime

# Load data
with open("projects/projects.yaml") as pf:
    projects = yaml.safe_load(pf)

with open("blogs/blogs.yaml") as bf:
    blogs = yaml.safe_load(bf)

with open("resources/resources.yaml") as rf:
    resources = yaml.safe_load(rf)

with open("knowledge_base/knowledge_base.yaml") as kf:
    knowledge_base = yaml.safe_load(kf)

# Filter highlighted projects
highlighted_projects = [p for p in projects if p.get("highlight")]

# Sort blogs by date descending and take latest 3
def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except:
        return datetime.min

latest_blogs = sorted(blogs, key=lambda b: parse_date(b.get("date", "")), reverse=True)[:3]

# Filter highlighted projects
highlighted_resources = [r for r in resources if r.get("highlight") == "True"]

highlighted_knowledge_base = [k for k in knowledge_base if k.get("highlight") == "True"]

# Build home structure
home = {
    "projects": highlighted_projects,
    "blogs": latest_blogs,
    "resources": highlighted_resources,
    "knowledge_base": highlighted_knowledge_base,
}

# Save to home.yaml
with open("home.yaml", "w") as f:
    yaml.dump(home, f, sort_keys=False)

print("Regenerated home.yaml")

#clean up home.yaml for json
def sanitize_for_json(data):
    if isinstance(data, dict):
        return {k: sanitize_for_json(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [sanitize_for_json(i) for i in data]
    elif isinstance(data, datetime):
        return data.isoformat()
    else:
        return data

data = yaml.safe_load("home.yaml")    
with open("home.json", "w") as jout:
    json.dump(sanitize_for_json(home), jout, indent=2)

print(f"Regenerated home.json")