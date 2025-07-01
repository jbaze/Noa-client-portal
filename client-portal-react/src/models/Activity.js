export class Activity {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.time = data.time || '';
    this.type = data.type || 'general';
    this.icon = data.icon || '';
  }

  getTypeColor() {
    const colors = {
      upload: 'bg-blue-500',
      approval: 'bg-green-500',
      meeting: 'bg-purple-500',
      delivery: 'bg-indigo-500'
    };
    return colors[this.type] || 'bg-gray-500';
  }
}