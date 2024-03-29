const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
client.on("error", (err) => console.error("Redis Client Error:", err));

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} GitHub public repositories</h2>`;
}

// Make request to GitHub for data
async function getRepos(req, res, next) {
  try {
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();

    const repos = data.public_repos;

    // Set data to Redis
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.error("Error fetching data from GitHub:", err);
    res.status(500).send("Internal Server Error");
  }
}

// Cache middleware
function cache(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) {
      console.error("Redis Error:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
}

app.get("/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
