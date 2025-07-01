export class Deliverable {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.type = data.type || '';
    this.projectId = data.projectId || '';
    this.projectName = data.projectName || '';
    this.date = data.date || '';
    this.status = data.status || 'Pending';
    this.fileUrl = data.fileUrl || '';
    this.fileSize = data.fileSize || '';
    this.downloadCount = data.downloadCount || 0;
    this.description = data.description || '';
    this.version = data.version || '1.0';
  }

  getStatusColor() {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800',
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Revision Requested': 'bg-red-100 text-red-800',
      'In Progress': 'bg-gray-100 text-gray-800'
    };
    return colors[this.status] || 'bg-gray-100 text-gray-800';
  }

  getFileTypeIcon() {
    const icons = {
      'Design Files': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      'Brand Assets': 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z',
      'Interactive Prototype': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'Documentation': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    };
    return icons[this.type] || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
  }

  getFormattedFileSize() {
    if (!this.fileSize) return 'Unknown';
    const bytes = parseInt(this.fileSize);
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFormattedDate() {
    return new Date(this.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}