
export default class Api {
  // All GraphQL requests are POST requests to one endpoint
  fetch(query) {
    const baseUrl = "https://api.github.com/graphql"

    return global.fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ query: query })
    })
      .then(res => {
        return res.ok ? res.json() : res.then(inner => Promise.reject(inner))
      })
  }
}

