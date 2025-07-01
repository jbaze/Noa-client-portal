export class Project {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.progress = data.progress || 0;
    this.status = data.status || 'Not Started';
    this.priority = data.priority || 'Medium';
    this.dueDate = data.dueDate || '';
    this.lastUpdate = data.lastUpdate || '';
    this.startDate = data.startDate || '';
    this.budget = data.budget || 0;
    this.team = data.team || [];
    this.tags = data.tags || [];
  }

  isOverdue() {
    if (!this.dueDate) return false;
    const today = new Date();
    const due = new Date(this.dueDate);
    return due < today && this.status !== 'Completed';
  }

  getDaysRemaining() {
    if (!this.dueDate) return 0;
    const today = new Date();
    const due = new Date(this.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getStatusColor() {
    const colors = {
      'In Progress': 'bg-blue-100 text-blue-800',
      'Review': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'On Hold': 'bg-gray-100 text-gray-800',
      'Not Started': 'bg-gray-100 text-gray-800'
    };
    return colors[this.status] || 'bg-gray-100 text-gray-800';
  }

  getPriorityColor() {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return colors[this.priority] || 'bg-gray-100 text-gray-800';
  }

  getProgressPercentage() {
    return Math.min(Math.max(this.progress, 0), 100);
  }

  getFormattedBudget() {
    if (!this.budget || this.budget === 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(this.budget);
  }
}