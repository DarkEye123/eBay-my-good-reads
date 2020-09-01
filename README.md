# If you wonder what this should do

see [exercise description](https://github.com/DarkEye123/eBay-my-good-reads/blob/master/README_original.md).
You can check how application works on _this_ [video](https://github.com/DarkEye123/eBay-my-good-reads/raw/master/app_video.webm)

## If you want to know how I proceeded in this project

Whole project is in typescript - apart [Jest](https://jestjs.io/) unit tests and [Cypress](https://www.cypress.io/) E2E tests; these uses pure js.

1. ### State management

   I used react ctx with custom made state management similar to 'redux' solution.

   **Reasoning**:
   I'm fully aware that for this example, simple prop passing would be an easier and cleaner solution. What I aimed to show was that I'm capable of implementing more complex state management without any 3rd party solution. In the real world, I'd use probably react-apollo and thus local cache queries for state management.

2. ### Storage

   Project uses [localforage](https://localforage.github.io/localForage/) for a persistence of wishlisted books.

3. ### Components and accessibility

   All components are self-made and responsive - apart from loading SVG during data fetching and partially re-used search input. I applied techniques that should ensure that this app provides very good results regarding accessibility. During development I used [react-axe](https://github.com/dequelabs/react-axe) for most precise guideline following with eslint plugin: [jsx-a11y/recommended](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

4. ### Styling

   After some thinking, I've decided to use [styled-components](https://styled-components.com/) for styling. I've provided an example of the [theme](https://github.com/DarkEye123/eBay-my-good-reads/blob/master/src/styled.d.ts) set-up with for typing support in typescript. To improve the power of css-in-js solution, I've decided to re-use some helpful ideas from sass world via package [polished](https://github.com/styled-components/polished)

5. ### Testing & Project Development tweaks

   [Jest](https://jestjs.io/) unit tests and [Cypress](https://www.cypress.io/) E2E tests;
   `yarn test:unit`
   `yarn test:e2e` -- make sure app is running before e2e tests by `yarn start`
   I also uses [rollbar](https://rollbar.com/) for error reporting - and pre-commit hook doing linting + formatting running via [husky](https://github.com/typicode/husky#readme) and [lint-staged](https://github.com/okonet/lint-staged)

Bonus:
There is small example of self-made hook and whole project uses FC based concept of writing.

#### Potential improvements

Project right now exceeds requirements from the [exercise description](https://github.com/DarkEye123/eBay-my-good-reads/blob/master/README_original.md). Though it doesn't mean
there can't be improvement :)

1. usage of router for routing to separate page with wishlisted books
2. caching of requests to show immediate responses and provide possibility of optimistic updates
3. pagination or infinite loading -- I had to limit work on this project, so I didn't proceed with this solution, though I originally wanted.
4. better visuals + usage of [motion](https://www.framer.com/api/motion/) for animations
