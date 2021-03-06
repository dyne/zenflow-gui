import type {NextPage} from 'next'
import {useAuth} from "../lib/auth";
import User from "../components/UserActivities"

const Home: NextPage = () => {
  const { isSignedIn } = useAuth()
  return (<>
            {!isSignedIn && <><p>You should log in first</p></>}
            {isSignedIn && <User/>}
        </>)};

export default Home


