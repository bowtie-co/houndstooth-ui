/**
 * Api class to handle all interactions with backend
 */
export default class Api {
    /**
     * Constructor for an Api object
     */
    constructor() {
        // Root domain for the API (MUST be over HTTPS)
        // this.root = 'https://sbpt1jc3bl.execute-api.us-west-2.amazonaws.com';
        this.root = process.env.REACT_APP_API_ROOT_URL;

        // API stage (dev only for now)
        this.stage = process.env.REACT_APP_API_STAGE;

        // API path prefix (shouldn't change)
        this.prefix = process.env.REACT_APP_API_PREFIX;

        // API version (in case future versions are released, this is easy to change)
        this.version = process.env.REACT_APP_API_VERSION;

        // Obtain token from local storage
        this.loadToken();

        // Sanitize all API variables for this API instance
        this.sanitize();

        // Validate this API instance
        this.validate();
    }

    /**
     * Sanitize all API variables for this API instance
     */
    sanitize() {
        console.log(this.root);

        // Split the root member variable on '://' (to ensure protocol exists or we can add it)
        const rootParts = this.root.split('://');

        // If more than 1 part, then protocol is specified
        if (rootParts.length > 1) {
            // Ensure specified protocol is HTTPS
            if (rootParts[0] !== 'https') {
                console.error('API Base URL must use HTTPS');
            }
        } else {
            // No protocol specified in "this.root", so prepend "https://"
            this.root = `https://${this.root}`;
        }

        // Trim trailing slash from root member variable (if present)
        if (this.root.substr(-1) === '/') {
            this.root = this.root.substr(0, this.root.length - 1);
        }

        // Remove all slashes from other member variables (stage, prefix, version, etc)
        this.stage.replace('/', '');
        this.prefix.replace('/', '');
        this.version.replace('/', '');
    }

    /**
     * Load the auth token from local storage (and save to "this.token")
     */
    loadToken() {
        // Find token using localStorage, and assign to "this.token"
        this.token = localStorage.getItem('id_token');

        // Return current token
        return this.token;
    }

    /**
     * Dynamic function with default options (this will lookup token every time)
     */
    defaultOptions() {
        return {
            // Default to GET HTTP method
            method: 'GET',

            // Default Auth headers with token
            headers: {
                Authorization: `Bearer ${this.loadToken()}`
            },

            body: {}
        }
    }

    /**
     * Validate this API instance
     */
    validate() {
        /**
         * This method can/will validate this API instance in more detail after being sanitized
         */

        // if (!this.token || this.token.trim() === '') {
        //   console.error('Invalid/missing token');
        // }
    }

    /**
     * Construct the base URL for this API (using other member variables)
     */
    baseUrl() {
        return `${this.root}/${this.stage}/${this.prefix}/${this.version}/`;
    }

    /**
     * Build a request URL for a specific path
     */
    buildUrl(path) {
        // If the path begins with a slash, remove the slash (since the baseUrl function ends with slash already)
        if (path.substr(0, 1) === '/') {
            path = path.substr(1);
        }

        // Return the full URL for the specified path
        return this.baseUrl() + path;
    }

    /**
     * Generic request execution method
     *    For a GET request, only the "path" parameter is required
     */
    callRoute({ path, options = {}, params = {} }) {
        // Return a promise so we can handle async requests in the components
        return new Promise(
            // Promise format using resolve and reject functions
            (resolve, reject) => {
                // Debug
                console.log('Calling route:', path);

                // Merge options provided to this method with the default options for this API instance
                const callOptions = Object.assign({}, this.defaultOptions(), options);
                console.log("callOptions: ", callOptions);

                // Call fetch for the full request URL (using buildUrl function and merged callOptions object)
                fetch(this.buildUrl(path), callOptions)
                    // Convert response body to JSON (should trigger catch if fails)
                    .then(response => response.json())

                    // After converting to JSON, resolve the callRoute() Promise with the returned data
                    .then(data => {
                        // Debug
                        console.log('Response data', data);

                        // Resolve promise
                        resolve(data);
                    })

                    // Catch fetch error and reject the Promise
                    .catch(reject)
            }
        );
    }

    /**
     * Helper for simple GET requests (only need to call "api.get('something')")
     */
    get(path) {
        // Return the result (Promise) of callRoute() with the provided path
        return this.callRoute({ path });
    }

    post(path, body = {}) {
        const options = {
            method: 'POST',
            body: JSON.stringify(body)
        }

        // Return the result (Promise) of callRoute() with the provided path
        const result = this.callRoute({ path, options });
        return result
    }

    put(path, body = {}) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(body)
        }

        // Return the result (Promise) of callRoute() with the provided path
        return this.callRoute({ path, options });
    }

    delete(path, body = {}) {
        const options = {
            method: 'DELETE'
        }

        // Return the result (Promise) of callRoute() with the provided path
        return this.callRoute({ path, options });
    }
}
