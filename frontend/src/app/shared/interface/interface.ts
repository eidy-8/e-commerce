export interface ToasterData {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}