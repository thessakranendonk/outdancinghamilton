'use client'

export interface DateCardProps {
    date: Date
}

export default function DateCard({date}: DateCardProps){
    return (
        <div className="mt-10 text-center pl-20">
            <p className="text-5xl font-bungee text-brand-base/60 text-shadow-md">{date.toLocaleDateString("en-US", {
                      month: "short",
                    })}</p>
            <p className="text-6xl font-bungee text-brand-pop/90 text-shadow-sm text-shadow-brand-base/10">{date.toLocaleDateString("en-US", {
                      day: "numeric",
                    })}</p>
            
        </div>
    )
}