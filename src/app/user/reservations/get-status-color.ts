export function getStatusColor(status: string) {
  const colors: any = {
    PENDING: {
      bg: 'bg-warning-subtle',
      text: 'text-warning',
      border: 'border-warning',
    },

    AVAILABLE: {
      bg: 'bg-success-subtle',
      text: 'text-success',
      border: 'border-success',
    },

    FULFILLED: {
      bg: 'bg-primary-subtle',
      text: 'text-primary',
      border: 'border-primary',
    },

    CANCELLED: {
      bg: 'bg-danger-subtle',
      text: 'text-danger',
      border: 'border-danger',
    },

    EXPIRED: {
      bg: 'bg-secondary-subtle',
      text: 'text-secondary',
      border: 'border-secondary',
    },
  };

  return colors[status] || colors['EXPIRED'];
}