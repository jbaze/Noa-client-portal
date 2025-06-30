import { HttpInterceptorFn } from '@angular/common/http';
import { of, delay } from 'rxjs';

export const fakeApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Simulate API responses for demo purposes
  if (req.url.includes('/api/projects')) {
    const mockResponse = {
      id: '1',
      name: 'Premium Branding Package',
      progress: 65,
      status: 'active'
    };

    return of({
      status: 200,
      body: mockResponse
    } as any).pipe(delay(300));
  }

  if (req.url.includes('/api/deliveries')) {
    const mockDeliveries = [
      {
        id: '1',
        name: 'Initial Brand Concepts',
        deliveryDate: '2024-01-25',
        downloadUrl: '#'
      }
    ];

    return of({
      status: 200,
      body: mockDeliveries
    } as any).pipe(delay(300));
  }

  return next(req);
};
