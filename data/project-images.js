/**
 * data/project-images.js — the screenshots of each project (images only).
 *
 * Where the files live:  assets/images/projects/<project id>/
 * Order here = order in the swipe carousel.
 *
 * To add a screenshot:
 *   1) copy the file into  assets/images/projects/<project id>/
 *   2) add its file name to that project's list below
 *
 * New project?  Add a line:   "my-new-app": ["1.jpeg", "2.jpeg"],
 * (the key must be the same as the project's id in data/projects.js)
 *
 * File names are case-sensitive on GitHub Pages: "ias1.jpeg" is not "IAS1.JPEG".
 */

const PROJECT_IMAGES_BASE = "assets/images/projects";

const PROJECT_IMAGES = {
  "dev-control": ["dv1.jpeg", "dv2.jpeg", "dv3.jpeg"],
  "click-buddy": ["cb1.jpeg", "cb2.jpeg", "cb3.jpeg", "cb4.jpeg"],
  "fruit-game": ["fg1.jpeg", "fg2.jpeg"],
  "image-search-app": ["ias1.jpeg", "ias2.jpeg", "ias3.jpeg", "ias4.jpeg", "ias5.jpeg", "ias6.jpeg", "ias7.jpeg"],
};
