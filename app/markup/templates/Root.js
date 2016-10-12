import React from 'react'

import Head from '../components/Head.js'
import Header from '../components/Header.js'

export default props => (
<html>
  <Head {...props}/>
<body>
  <Header {...props}/>

  <main id='root' className='outer'>
    <section className="question-outer flex flex-items-center flex-justify-center pv1 mv05 ts1">
      <div className="block tsx">
        <div className="container--s w1 mha">
          <div id="questionRoot" className="prompt"></div>
        </div>
      </div>
    </section>

    <div id="gif" className="gif fixed fit-x height-100 hide">
      <img className="block absolute fit-x" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"/>
    </div>
  </main>
  
  <script src="/index.js"></script>
</body>
</html>
)
