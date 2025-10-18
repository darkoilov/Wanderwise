export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-96 rounded-xl bg-gray-100 animate-pulse" />
                ))}
            </div>
        </div>
    )
}
