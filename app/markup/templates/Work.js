import React from 'react'

// components
import Main from '../components/Main.js'
import Foot from '../components/Foot.js'
import WorkItem from '../components/WorkItem.js'
import FavProject from '../components/FavProject.js'

// elements
import PageTitle from '../elements/PageTitle.js'
import SectionDivider from '../elements/SectionDivider.js'

export default props => (
  <Main {...props}>
    <div className="container--s mha pv1 ts1">

      <PageTitle>Look on my works, ye Mighty, and despair!</PageTitle>

      <SectionDivider>experimental</SectionDivider>

      <div className="pv05 ts2">

        <WorkItem
          title="Grandfathered"
          caption="How happy the blameless vestal’s lot, the world forgetting by the world forgot. Eternal sunshine of the spotless mind."
          url="/work/grandfathered"
          image="http://res.cloudinary.com/teaandarmpits/image/upload/w_600/v1476035172/grandfathered/Fox_Grandfathered_1_ezk3mg.jpg"/>

      </div>

      <SectionDivider>selected clients</SectionDivider>

      <div className="pv1 ts2">
        <div className="flex flex-wrap flex-justify-between flex-items-center">
          <div className="client-logo ph05">
          </div>
        </div>
      </div>

      <SectionDivider>personal favs</SectionDivider>

      <div className="pv05 ts2">
        <FavProject
          title="How to be a Goddamn Lady"
          caption="How happy the blameless vestal’s lot, the world forgetting by the world forgot."
          url="work/how-to-be-a-lady"/>
        <FavProject
          title="How to be a Goddamn Lady"
          caption="How happy the blameless vestal’s lot, the world forgetting by the world forgot."
          url="work/how-to-be-a-lady"/>
      </div>

    </div>

    <Foot {...props}/>
  </Main>
)
