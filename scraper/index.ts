import axios from 'axios'
import config from 'config'

(async () => {
  const {
    data: {
      result_size: totalFlats
    }
  } = await axios.get(config.get('scraper.sreality.entryPoint'))

  console.log('totalFlats', totalFlats)
  console.log('totalPages', Math.ceil(totalFlats / <number>config.get('scraper.sreality.resultsPerPage')))
})()
