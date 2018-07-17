import React from 'react'
import {
  Subtitle
} from 'atoms'

const Description = ({ ...rest }) => {
  return (
    <div className='home-template'>
      <p className='intro'>
        This starter kit is an ejected version of create-react-app and comes preloaded with the following libraries:
      </p>
      <div className='list-section' />
      <Subtitle title={'File structure'} />
      <p>
        The component file structure contains all components with their associated containers, tests, style modules, and jsx files. Everything relating to a specific component should be contained in it's own directory. Since this boilerplate uses recompose, the .jsx file should only contain the PureComponent with few, if any logic. The container should contain all logic and component enhancements.
      </p>
      <Subtitle title={'Configuration'} />
      <p>
        Api - this component is a base Api to handle all logic for fetch calls. It contains a base URL, user tokens, and stores user token. Set up a .env file with appropriate variable names.
      </p>
      <p>
        PrivateRoute Component - when using this component, you need to pass in what ever boolean method yuo are using to authorize the user.
      </p>
      <ul className='list'>
        <li className='list-item'>git clone</li>
        <li className='list-item'>npm install</li>
        <li className='list-item'>npm start</li>
        <li className='list-item'>testing:  npm test</li>
      </ul>
    </div>
  )
}

export default Description
