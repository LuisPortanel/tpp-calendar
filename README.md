# TPP Holiday Calendar

By Luis Portanel, **React Technical Leader** ([luis@portanel.com](mailto:luis@portanel.com))

This is a proof of concept to show all the knowledge I have on React and all the Frontend Stack in general.

## Usage

`yarn install` to install all the dependencies.

`yarn start` to start the App.

## Functionality

### TPP Holiday Calendar

When the app loads, it shows a MUI AppBar where the user can select a Country. This selection will redirect the user to `/us`, `/ca` or `/ar` pages where the Calendar Table will render using the current year and selected country. Any other Country Code will trigger a 404 error.

While the fetching is in progress, a `CircularProgress` is shown. If a fetch is done while there's another fetch in progress, it will cancel the previous one to avoid unnecessary requests.

The API endpoint is misconfigured; it doesn't have `Access-Control-Allow-Origin` headers. Due to this, it doesn't allow requests made by external domains. This can be bypassed with a CORS browser plugin, but in this case the app uses a proxy to avoid this problem:
**PROXY: https://cors-anywhere.herokuapp.com**

The `YearPicker` allows the user to choose a year from a DatePicker or to manually enter it from an input. It will validate the year and make requests only if the year is inside the valid interval.

The API response is saved on the Redux state and used to create the Tabular Table. It shows the rows according to the specifications and each has a delete button which will trigger a modal for confirmation. When an entry is deleted, it's removed from the redux state using the date/name combination.

### Flow: Static type checker implemented

Flow has been implemented on the entire project as a lightweight static type checker.

It helps us to easily understand which are the parameters a component or function can take and what value you can expect with tooltips provided by the IDE.

### Project management

The entire project was divided into User Stories. Each of them had subtasks to address before marking the US as completed. Trello was used to keep track of this.

Trello Board: https://trello.com/b/2bNS4Uis/ttp-calendar

### Git

Git was used to organize the project's versioning. Each commit includes the User Story code associated with the work done, followed by a brief description of the commit content. Run `git log` for more information.


## Dependencies

This project was created with Create React App as a base.

Then, lost of dependencies were installed to add awesome functionality like:

*   **React Redux**: To create the store as a single source of truth.
*   **Redux Thunk**: To manage asynchronous dispatch of actions.
*   **Redux DevTools Extension**: To debug the store on the browser.
*   **React Router**: To implement routing and history.
*   **EsLint**: To generate a standarized code.
*   **Flow**: To add static typing.
*   **Axios**: To make reliable calls to PokéAPI.
*   **Material UI**: To implement Material Design with ready to use components.
*   **React Helmet**: To change page title programatically.
*   **Sass**: To easily prefix styles and write more concise styles.

