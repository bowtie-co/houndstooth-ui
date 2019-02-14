import Octokit from '@octokit/rest'
import storage from './storage'

const octokit = new Octokit({
  auth () {
    return `token ${storage.get('access_token')}`
  }
})

export default octokit
