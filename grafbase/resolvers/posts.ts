const baseUrl = process.env.MONGODB_DATA_API_URL
const apiKey = process.env.MONGODB_DATA_API_KEY
const dataSource = process.env.MONGODB_DATA_SOURCE
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION

export default async function PostsResolver(_, { limit }) {
  try {
    const response = await fetch(`${baseUrl}/action/find`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        dataSource,
        database,
        collection,
        limit
      })
    })

    const data = await response.json()

    return data?.documents?.map(({ _id: id, title }) => ({
      id,
      title
    }))
  } catch (err) {
    return null
  }
}
