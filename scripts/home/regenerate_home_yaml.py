import os
import yaml
from datetime import datetime

# Load data
with open("projects/projects.yaml") as pf:
    projects = yaml.safe_load(pf)

with open("blogs/blogs.yaml") as bf:
    blogs = yaml.safe_load(bf)

# Filter highlighted projects
highlighted_projects = [p for p in projects if p.get("highlight")]

# Sort blogs by date descending and take latest 3
def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except:
        return datetime.min

latest_blogs = sorted(blogs, key=lambda b: parse_date(b.get("date", "")), reverse=True)[:3]

# Build home structure
home = {
    "projects": highlighted_projects,
    "blogs": latest_blogs
}

# Save to home.yaml
with open("home.yaml", "w") as f:
    yaml.dump(home, f, sort_keys=False)

print("✅ Generated home.yaml with highlighted projects and latest 3 blogs")
