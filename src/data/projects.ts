/**
 * Side project cards on the home page. Kept as plain data rather than a
 * content collection — there's no editorial workflow around these, just a
 * short static list.
 */
export interface Project {
  name: string;
  role: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'sass-lint',
    role: 'author',
    description: 'A pure-Node linter for Sass, from the pre-stylelint era.',
    url: 'https://github.com/sasstools/sass-lint',
  },
  {
    name: 'firestore-rule-testing',
    role: 'demo',
    description: 'Companion repo to the Firestore security rules series.',
    url: 'https://github.com/DanPurdy/firebase-firestore-rule-testing-demo',
  },
  {
    name: 'takecounter',
    role: 'tool',
    description: 'Take counter for recording-studio sessions, browser-based.',
    url: 'https://github.com/DanPurdy/takecounter',
  },
];
