"use server"

import Landing from './Landing'
import FeaturesPreview from './FeaturesPreview'
import CliSection from './CliSection'
import IntegrationSection from './IntegrationSection'

export default async function Home() {
    return (
        <main className="min-h-screen pt-16">
            <Landing />
            <FeaturesPreview />
            <IntegrationSection />
            <CliSection />
        </main>
    )
}
