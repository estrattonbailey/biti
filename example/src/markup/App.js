import React from 'react'

import Head from './components/Head.js'

export default props => (
  <html>
    <Head {...props}/>
    <body>
      <main id='root' className="ph1">
        <div className="container mha">
          {props.children}

          <footer className="pb2">
            <p className="mv0">
              Built with <a
                target="_blank"
                href="https://github.com/estrattonbailey/svbstrate">
                svbstrate
              </a> and <a
                target="_blank"
                href="https://github.com/estrattonbailey/fab.js">
                fab
              </a>.
            </p>
          </footer>
        </div>
      </main>

      <script src="/index.js"></script>
    </body>
  </html>
)
