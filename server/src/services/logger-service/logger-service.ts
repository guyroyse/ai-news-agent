/* Logger service for consistent logging */

export function log(source: string, ...args: any): void {
  console.log(`[${source}]`, ...args)
}

