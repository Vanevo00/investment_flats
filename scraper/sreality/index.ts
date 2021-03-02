import axios from 'axios'
import config from 'config'

const sreality = async () => {
  console.log('sreality runs')

  const {
    data: {
      result_size: totalFlats
    }
  } = await axios.get(config.get('scraper.sreality.entryPoint'))

  const totalPages = Math.ceil(totalFlats / <number>config.get('scraper.sreality.resultsPerPage'))

  const getFlatsIds = async (totalPages: number): Promise<number[]> => {
    const flatIds: number[] = []

    const pushSinglePageFlatIds = async (page: number): Promise<void> => {
      const {
        data: {
          _embedded: {
            estates
          }
        }
      } = await axios.get(`${config.get('scraper.sreality.entryPoint')}&page=${page}`)

      // eslint-disable-next-line camelcase
      estates.forEach((estate: { hash_id: number }) => flatIds.push(estate.hash_id))
    }

    const promises = []
    for (const page of Array(totalPages).keys()) {
      promises.push(pushSinglePageFlatIds(page))
    }
    await Promise.all(promises)

    console.log(flatIds.length)
    return [...new Set(flatIds)]
  }

  console.log(await getFlatsIds(200))
}

export default sreality
