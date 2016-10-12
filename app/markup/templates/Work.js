import React from 'react'

import Head from '../components/Head.js'
import Header from '../components/Header.js'

export default props => (
<html>
  <Head {...props}/>
<body>
  <Header {...props}/>

  <main id='root' classNameName='outer'>
    <div className="header-spacer"></div>

    <div className="container--s mha pv1 ts1">

      <h1 className="cb mv0">Look on my works, ye Mighty, and despair!</h1>

      <div className="mt2 cc tsx">
        <h5>experimental</h5>
        <hr/>
      </div>

      <div className="pv05 ts2">

        <article className="item relative flex flex-wrap pv05 ts2">
          <div className="item__image relative mb1 tsx">
            <a href="work/grandfathered">
              <img className="w1 absolute fit-x" src="http://res.cloudinary.com/teaandarmpits/image/upload/w_600/v1476035172/grandfathered/Fox_Grandfathered_1_ezk3mg.jpg"/>
            </a>
          </div>
          <div className="item__info mb1 tsx">
            <a href="work/grandfathered">
              <h3 className="mt0 cb">Grandfathered</h3>
            </a>
            <p className="mt0 cb">How happy the blameless vestal’s lot, the world forgetting by the world forgot. Eternal sunshine of the spotless mind.</p>
            <a href="work/grandfathered" className="h5">
              <span className="cb">view</span>
              <i className="arrow ci"></i>
            </a>
          </div>
        </article>

      </div>

      <div className="mt2 cc tsx">
        <h5>selected clients</h5>
        <hr/>
      </div>

      <div className="pv1 ts2">
        <div className="flex flex-wrap flex-justify-between flex-items-center">
          <div className="client-logo ph05">
          </div>
        </div>
      </div>

      <div className="mt2 cc tsx">
        <h5>personal favs</h5>
        <hr/>
      </div>

      <div className="pv05 ts2">
        <article className="fav relative px05 mv05 ts2">
          <a href="/"><h3 className="mv0">
            <span className="cb">How to be a Goddamn Lady</span>
            <i className="arrow"></i>
          </h3></a>
          <p className="cb mv0">How happy the blameless vestal’s lot, the world forgetting by the world forgot.</p>
        </article>
        <article className="fav relative px05 mv05 ts2">
          <a href="/"><h3 className="mv0">
            <span className="cb">How to be a Goddamn Lady</span>
            <i className="arrow"></i>
          </h3></a>
          <p className="cb mv0">How happy the blameless vestal’s lot, the world forgetting by the world forgot.</p>
        </article>
      </div>

    </div>

    <div className="foot">
      <footer className="nav outer">
        <hr className="cb"/>
        <nav className="nav__inner inline-block flex-auto">
          <a href="/about">/about</a>
          <a href="/work">/work</a>
          <a href="/contact">/contact</a>
        </nav>
      </footer>
    </div>
  </main>
</body>
</html>
)
