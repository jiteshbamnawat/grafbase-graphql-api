const baseUrl = process.env.MONGODB_DATA_API_URL
const apiKey = process.env.MONGODB_DATA_API_KEY
const dataSource = process.env.MONGODB_DATA_SOURCE
const database = process.env.MONGODB_DATABASE
const collection = process.env.MONGODB_COLLECTION

export default async function DeletePostResolver(_, { id }) {
  try {
    const response = await fetch(`${baseUrl}/action/deleteOne`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        dataSource,
        database,
        collection,
        filter: {
          _id: {
            $oid: id
          }
        }
      })
    })

    const { deletedCount } = await response.json()

    return !!deletedCount
  } catch (err) {
    return false
  }
}
