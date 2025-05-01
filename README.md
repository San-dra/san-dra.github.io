##  Getting Started

This is a modular, YAML-driven portfolio website powered by Quarto and custom automation scripts. Each project is self-contained and rendered as a standalone web page using a Quarto template. Projects are centrally indexed using `projects.yaml` and dynamically rendered on the site.

### Folder Structure Overview
```
/projects/
  └── Project Name/
      ├── project.yaml           # Metadata for this project
      ├── images/                # Thumbnail & GIF
      ├── content/               # Final rendered HTML lives here
      └── quarto/                # Quarto project with index.qmd

/assets/
  └── project-template/         # Template copied when creating a new project

/scripts/
  ├── create_project.sh
  ├── render_quarto_project.sh
  ├── regenerate_projects_yaml.py
  └── update_projects_yaml.sh
```

---

## Project Automation Scripts

| Script                            | Purpose                                                                 |
|----------------------------------|-------------------------------------------------------------------------|
| `create_project.sh`              | Prompts for a project name, copies the template, and fills in `title` and `slug` in `project.yaml`. |
| `regenerate_projects_yaml.py`    | Aggregates metadata from all `project.yaml` files to build `projects.yaml` and `projects.json`. |
| `update_projects_yaml.sh`        | Re-runs metadata aggregation manually when you've edited a `project.yaml` file. |
| `render_quarto_project.sh`       | Renders the Quarto `index.qmd` file for a specific project, outputting to `/content/index.html`. |

---

## Example workflow

```bash
# Step 1: Create a new project
./scripts/create_project.sh

# Step 2: Update the project's content
./scripts/render_quarto_project.sh

# Step 3: Regenerate the projects index
./scripts/update_projects_yaml.sh
```

---

## 🧠 Tips
- All project metadata lives in `project.yaml`
- Each project is fully self-contained
- Use the placeholder content in the Quarto template as a guide for updates
- Project cards are dynamically loaded from `projects.json` by the front end
