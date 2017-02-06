import React from 'react'

import App from 'Root/App'

export default props => (
  <App>
    <section className="pv2 scale1">
      <div className="scale0">
        <header className="scale0">
          <h1 className="h3">estrattonbailey</h1>
          <h3 className="h4">Developer &amp; pretend designer. I like open source and 🍺</h3>
          <div className="flex flex-wrap">
            <a href="https://twitter.com/estrattonbailey" target="_blank" className="mr1 h5 bold --underline">Twitter</a>
            <a href="https://github.com/estrattonbailey" target="_blank" className="mr1 h5 bold --underline">Github</a>
          </div>
        </header>
        <div className="pv2 scale0">
          <div className="pv2">
            <h2 className="h4">Open Source</h2>
            <hr/>
          </div>

          {props.projects.map(project => (
            <div key={project.url} className="pv1">
              <h4 className="h5 mb0">{project.title}</h4>
              <p className="mv0">{project.description}</p>
              <a href={project.url} target="_blank">Explore</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  </App>
)
