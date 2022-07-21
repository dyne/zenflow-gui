import React from 'react';
import type {NextPage} from 'next'
import {gql, useQuery} from '@apollo/client'
import RenderActivities from "../components/renderActivities"
import Link from "next/link";
import NewProcessButton from "./NewProcessButton";
import Spinner from "./brickroom/Spinner";


const FETCH_USER_DATA = gql`
        query {
          me {
            user {
              userActivities {
                object {
                  __typename
                   ... on Process {
                        __typename
                        id
                        name 
                        note
                        finished
                        inputs {
                          id
                          provider {displayUsername id}
                          receiver {displayUsername id}
                        }
                        outputs {
                          id 
                          provider {displayUsername id}
                          receiver {displayUsername id}
                        }
                      }
                  ... on EconomicEvent {
                    id
                    note
                    provider {displayUsername id}
                    receiver {displayUsername id}
                    resourceConformsTo {name note}
                    resourceInventoriedAs {name id note}
                    toResourceInventoriedAs {name note}
                    inputOf {
                      id
                      name
                    }
                    outputOf {
                      id
                      name
                    }
                    atLocation {
                      id
                      name
                    }
                    
                    action { id }
                    resourceQuantity {
                      hasNumericalValue
                      hasUnit {label symbol}
                    }
                  }
                }
              }
            }
          }
        }`
const HomeProps = {
    welcome: {
        title: "Welcome to Interfacer Alpha",
        paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est.",
    }
}


const User: NextPage = () => {
    const activities = useQuery(FETCH_USER_DATA).data?.me?.user.userActivities
    return <>
        <div className="flex justify-between mb-6">
            <div className="w-96">
                <h2>{HomeProps.welcome.title}</h2>
                <p>{HomeProps.welcome.paragraph}</p>
            </div>
            <div className="w-80">
                <NewProcessButton/>
                <Link href="/processes">
                    <a className="btn btn-outline font-medium normal-case btn-primary w-60 ml-4">
                        See all process
                    </a>
                </Link>
            </div>
        </div>
        {activities && <ul>
            <RenderActivities userActivities={activities}/>
        </ul>}
        {!activities && <Spinner/>}

    </>
};

export default User
