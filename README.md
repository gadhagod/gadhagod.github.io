My personal website, served at [gadhagod.github.io](https://gadhagod.github.io).

## Content changes
To change the items shown in the projects, organizations, or activity pages, modify the respective key in [data.json](data.json). 

## Previewing the site
1. `node build` to build the HTML pages (with `-w` flag to watch files for changes). The built files are placed into the `build` directory.
2. `open build/index.html` to open the preview in browser.

## [data.json](data.json) schema

```jsonc
{
    "projects": [ // list of featured projects
        {
            "title": "", // project title
            "image": {
                "path": "", // project image path relative to static/img/projects
                "class": "" // project image CSS class (defined in static/style.css)
            },
            "description": "", // HTML project description
            "links": [
                {
                    "name": "", // link name
                    "url": "" // link destination
                },
                // more links...
            ]
        }
        // more projects...
    ],
    "orgs": [ // list of organizations
        {
            "title": "", // organization name
            "image": {
                "path": "", // organization logo path relative to static/img/orgs
                "class": "" // organization logo image CSS class (defined in static/style.css)
            },
            "url": "", // organization website
            "description_partial": "" // path of HTML file describing organization relative to partials/org-descriptions
        }
        // more organizations...
    ],
    "activity": { // object of side projects
        "" /* date of creation */: [
            {
                "title": "", // title of project
                "link": "", // project website
                "description": "" // project description
            }
            // more projects...
        ]
        // more dates...
    }
}
```

## Developing
### Static files
The website's images, JavaScript, and CSS are defined in the [static](static) directory. 

### Templates
[data.json](data.json) is rendered into the [EJS](https://ejs.co) templates defined in the [templates](templates) directory. The HTML layouts for each individual page is defined in its EJS file. All references to static file paths are relative to the [static](static) directory.

### Partials
Partials are inserted into EJS templates with the `include` function. All references to static file paths are relative to the [static](static) directory.

## Deployment
To deploy this website, push to the built website `dist` branch. Your changes should be deployed in a few minutes at [gadhagod.github.io](https://gadhagod.github.io). GitHub workflows (defined in [.github/workflows](.github/workflows)) automatically does this process on pushes to the `main` branch.