# redis_cache_example
Node.js & Redis caching example

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MahmudJion/redis_cache_example.git
   ```

2. Install the dependencies:

   ```bash
   cd redis_cache_example
   npm install
   ```

3. Start Redis server:

   Ensure that you have Redis installed and running on your local machine. By default, Redis runs on port 6379. If you are using a different port or Redis instance, make sure to update the configuration accordingly.

## Usage

To run the application, execute the following command:

```bash
node index.js
```

The application will start running on the default port 3000. You can access it by visiting `http://localhost:3000` in your web browser.

## How it Works

The application demonstrates a simple caching mechanism using Redis. It exposes a single endpoint `/data/:id` that accepts a parameter `id`.

When a request is made to `/data/:id`, the application first checks if the data corresponding to the given `id` is present in the Redis cache. If the data exists in the cache, it is retrieved and returned as the response.

If the data is not found in the cache, the application simulates fetching the data from a database or an external API. After retrieving the data, it stores it in the Redis cache with an expiration time of 5 minutes. Subsequent requests for the same `id` within the expiration time will fetch the data directly from the cache.

The application uses the `redis` package to interact with the Redis server. The Redis client is created and configured to connect to the Redis server running on the specified port. The cache middleware checks if the data corresponding to the `id` is present in the cache using the Redis `GET` command. If the data is found, it is returned as the response. Otherwise, the request proceeds to the next middleware, where the data is fetched and stored in the Redis cache using the `SETEX` command.

The expiration time for the cache is set to 5 minutes (300 seconds). You can adjust this value according to your requirements by modifying the `cacheExpiration` variable in the `index.js` file.

## Contributing

Contributions to this repository are welcome. If you find any issues or want to enhance the functionality, feel free to open a pull request.