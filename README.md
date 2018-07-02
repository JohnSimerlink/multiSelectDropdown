# Group Multi Select

I needed a multi-select dropdown with the below features, and couldn't find anything that was exactly what I wanted, so I wrote this little library.

# DEMO

![Demo](https://imgur.com/a/ZcylIwH "Demo")
# USAGE
- `git clone https://github.com/JohnSimerlink/multiSelectDropdown.git`
- copy and paste the multigroupselect.css and multigroupselect.js files into your project appropriately
- in your index.html include the multigroupselect.css and multigroupselect.js files appropriately. or otherwise use the files with ES6 modules or some webpack importing system
- add `class="mgs-group_multiselect"` to your `select` element that already has the `multiple` attribute listed
- add a `data-label` attribute to your select element. e.g. `<select multiple data-label="Choose Some Presidents" class="mgs-group_multiselect">....</select>`

# Features
- [x] clicking on the title/label on the menu reveals all the options of the menu, but no options are revealed before clicking
- [x] when the menu is revealed it should be overlayed upon lower elements, and not push them down
- [x] clicking on a group name selects all of the options under the group name
- [] ability to pass in custom classes

## TODO
- [x] index.html that has a test list with data-label element, and that imports the library first from a statically written js file and css file
- [] get index.html importing from webpack-dev-server live or from the compiled file in /dist
- [] transition to use SASS/LESS
- [] transition to use HAML
- [] package up into an npm package
