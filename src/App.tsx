import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './component/notFound'
import Home from './component/mainComponent/pages/home'
import Profile from './component/mainComponent/pages/profile/profile'
import PerformanceRatingForm from './component/mainComponent/pages/ipcrf/performanceRatingForm'
import Template from './component/mainComponent/pages/ipcrf/template'
import DevelopmentPlan from './component/mainComponent/pages/ipcrf/developmentPlan'
import PerformanceRating from './component/mainComponent/pages/performanceRating/performanceRating'
import PerformanceInterventions from './component/mainComponent/pages/performanceInterventions/performanceInterventions'
import CoachingMentoring from './component/mainComponent/pages/coachingMentoring/coachingMentoring'
import Others from './component/mainComponent/pages/others/others'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/performance-rating-form" element={<PerformanceRatingForm />}></Route>
        <Route path="/template" element={<Template />}></Route>
        <Route path="/development-plan" element={<DevelopmentPlan />}></Route>
        <Route path="/performance-rating" element={<PerformanceRating />}></Route>
        <Route path="/performance-interventions" element={<PerformanceInterventions />}></Route>
        <Route path="/coaching-mentoring" element={<CoachingMentoring />}></Route>
        <Route path="/others" element={<Others />}></Route>
      </Routes>
    </BrowserRouter>
  )
}