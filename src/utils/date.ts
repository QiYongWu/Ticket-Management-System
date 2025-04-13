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

  /**
 * 将 Date 类型格式化为 YYYY-MM-DD 字符串
 * @param date - JavaScript Date 对象
 * @returns 格式为 "2025-04-01" 的字符串
 */

 export  function formatDateToYMD(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()  + 1  // 月份从0开始，所以加1
  const day = date.getDate()

  // 补零操作：确保始终是两位数
  const formattedMonth = month < 10 ? `0${month}` : `${month}`
  const formattedDay = day < 10 ? `0${day}` : `${day}`

  return `${year}-${formattedMonth}-${formattedDay}`
}