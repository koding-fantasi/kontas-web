"use server"

import Landing from './Landing'
// import FeaturesPreview from './FeaturesPreview'

export default async function Home() {
    return (
        <main className="min-h-screen pt-16">
            <Landing />
            {/* <FeaturesPreview /> */}
        </main>
    )
}
