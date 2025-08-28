import CategoryMap from '@/components/map/CategoryMap'
import Container from '@/components/Container'

export default function MapPage() {
  return (
    <div className="pt-4">
      <Container>
        <div className="pb-2">
          <h1 className="text-xl font-semibold">Explore the Atlas</h1>
          <p className="text-neutral-400">Pan, zoom, search, and click bubbles to open tool pages.</p>
        </div>
      </Container>
      <Container className="mt-4 mb-12">
        <CategoryMap />
      </Container>
    </div>
  )
}


