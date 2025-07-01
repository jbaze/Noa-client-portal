export class User {
  constructor(data = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.initials = data.initials || '';
    this.company = data.company || '';
    this.memberSince = data.memberSince || '';
  }

  getDisplayName() {
    return this.name || this.email;
  }

  getInitials() {
    if (this.initials) return this.initials;
    
    const names = this.name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase();
  }
}