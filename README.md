# Focus styles bookmark

## Usage (repository)

+ Use `npm run build` to generate the code of the bookmark under the `/dist` directory.

+ Use `npm run watch` to watch for code changes and re-build in `/temp`. _Doesn't create bookmark-ready code_

+ Use `npm run serve` to serve the test page that uses the generated script in `/temp` for quick testing :)
  
  You can find it @ http://localhost:3000


## Usage (bookmark)

### Install

Create a bookmark on your browser and paste the contents of `/dist/main.js` in the URL/Location field.

Then, use (click) your bookmark while navigating the site to start the script and add focus styles to the website :)

### Special Keys

While the script is running, you can use the following keys to interact with it:

+ Press <kbd>0</kbd> to toggle the color of the focus styles.

+ Press <kbd>i</kbd> to toggle inspector display.

+ Press <kbd>p</kbd> to toggle inspector position between Bottom (default) or Side (right column).