import { ArrowUp, ArrowDown, ExternalLink } from "lucide-react"

export interface ToolCardProps {
  name: string
  reason: string
  quality_note: string
  url: string
}

export function ToolCard({ name, reason, quality_note, url }: ToolCardProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {name}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Visit Website
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="p-6 pt-0 space-y-4 flex-1">
        <div>
          <h4 className="font-medium text-sm text-slate-500 mb-1">Why it&apos;s best:</h4>
          <p className="text-sm">{reason}</p>
        </div>
        <div>
          <h4 className="font-medium text-sm text-slate-500 mb-1">Output Quality:</h4>
          <p className="text-sm italic">{quality_note}</p>
        </div>

      </div>
      <div className="flex items-center p-6 pt-0 mt-auto">
        <div className="flex items-center space-x-2 border rounded-full px-3 py-1 bg-slate-50">
          <button className="text-slate-500 hover:text-green-600 transition-colors" title="Upvote">
            <ArrowUp className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">0</span>
          <button className="text-slate-500 hover:text-red-600 transition-colors" title="Downvote">
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
