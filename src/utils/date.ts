export function formatDateTime(date: Date): string {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-')
  }
  
  export function formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
  
    const pad = (n: number) => n.toString().padStart(2, '0')
    
    return days > 0 
      ? `${days}天 ${pad(hours % 24)}:${pad(minutes % 60)}`
      : `${pad(hours)}:${pad(minutes % 60)}`
  }

  // 日期格式化（ISO 8601格式）
export const formatDate = (date: Date): string => date.toISOString().split('T')[0]