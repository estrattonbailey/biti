import React from 'react'

import Head from './Head.js'
import Header from './Header.js'

export default props => (
  <html>
    <Head {...props}/>
    <body>
      <Header {...props}/>

      <main id='root' classNameName='outer'>
        <div className="header-spacer"></div>
        {props.children}
      </main>

      <script src="/index.js"></script>
    </body>
  </html>
)
