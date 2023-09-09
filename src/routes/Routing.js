import React ,{lazy,Suspense} from "react";
import {Route ,Routes} from "react-router-dom";
import SkeletonJs from "../Components/Skeleton/Skeleton";


const Layout = lazy(() => import('../Components/LayoutJs'))
const Kassa = lazy(() => import('../pages/Kassa/Kassa'))
const Users = lazy(() => import('../pages/Users/Users'))
const Income = lazy(() => import('../pages/Income/Income'))
const OutCome = lazy(() => import('../pages/OutCome/OutCome'))
const PageNotFound = lazy(() => import('../pages/PageNotFound/PageNotFound'))


const Routing = () => {
    return (
        <Suspense fallback={<SkeletonJs/>}>
            <Routes>
                <Route path='/' element={<Layout/>}></Route>
                <Route path='/kassa' element={<Kassa/>}/>
                <Route path='/users' element={<Users/>} />
                <Route path='/income' element={<Income/>} />
                <Route path='/OutCome' element={<OutCome/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </Suspense>
    )
}

export default Routing;

