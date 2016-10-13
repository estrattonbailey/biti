import React from 'react'

export default ({ title, caption, url, image }) => (
  <article className="item relative flex flex-wrap pv05 ts2">
    <div className="item__image relative mb1 tsx">
      <a href={url}>
        <img className="w1 absolute fit-x" src="{image}"/>
      </a>
    </div>
    <div className="item__info mb1 tsx">
      <a href={url}>
        <h3 className="mt0 cb">{title}</h3>
      </a>
      <p className="mt0 cb">{caption}</p>
      <a href={url} className="h5">
        <span className="cb">view</span>
        <i className="arrow ci"></i>
      </a>
    </div>
  </article>
)
