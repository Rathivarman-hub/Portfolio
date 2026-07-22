import booking from '../assets/booking.webp';
import vendorBridge from '../assets/vendorbridge.webp';
import stock from '../assets/stockzen.webp';
import evcharging from '../assets/evcharging.png';

export const projects = [
  {
    _id: '1',
    slug: 'vendorbridge',
    title: 'VendorBridge — Procurement ERP',
    tagline: 'End-to-end procurement workflow for vendors, RFQs, and purchase orders',
    description:
      'A full-stack procurement ERP that lets companies manage vendors, RFQs, quotations, purchase orders, and invoices with role-based access and real-time updates.',
    problem:
      'Manual vendor quote collection and PO tracking create delays, data silos, and approval bottlenecks in procurement teams.',
    features: [
      '4-role RBAC (Admin, Manager, Vendor, User)',
      'RFQ creation, quotation comparison, and PO lifecycle',
      'Real-time notifications via Socket.io',
      'Gmail OAuth2 email integration',
      'Cloudinary file uploads and analytics dashboard',
    ],
    challenges: [
      'Designed multi-role permission flows so each role sees only relevant procurement actions without leaking sensitive data.',
      'Implemented real-time RFQ updates with Socket.io to replace manual refresh workflows.',
      'Integrated Gmail OAuth2 for automated vendor communication while keeping credentials secure server-side.',
    ],
    image: vendorBridge,
    technologies: [
      'React 18',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.io',
      'JWT',
      'Cloudinary',
      'Gmail OAuth2',
      'RBAC',
    ],
    githubLink: 'https://github.com/Rathivarman-hub/vendor-bridge',
    liveLink: 'https://vendor-bridge-erp-system.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '2',
    slug: 'booking-platform',
    title: 'Booking Platform',
    tagline: 'Secure slot booking with OTP verification and role-based access',
    description:
      'A MERN booking platform where users register with OTP verification, book time slots, and manage reservations across participant, organiser, and admin roles.',
    problem:
      'Appointment systems need verified users, conflict-free slot booking, and different permissions for organisers and admins.',
    features: [
      'OTP-based registration and authentication',
      'Role-based access for Participants, Organisers, and Admins',
      'Slot booking and booking management dashboard',
      'RESTful API with JWT-secured routes',
    ],
    challenges: [
      'Built OTP verification flow with secure token handling to prevent unauthorized bookings.',
      'Structured RBAC so organisers manage slots while admins oversee the full system.',
      'Designed MongoDB schemas to avoid double-booking on concurrent slot requests.',
    ],
    image: booking,
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'JWT', 'OTP Authentication'],
    githubLink: 'https://github.com/Rathivarman-hub/hackathon-booking',
    liveLink: 'https://appopintment-booking.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '3',
    slug: 'stockzen',
    title: 'StockZen — Inventory Management',
    tagline: 'Real-time inventory tracking with stock in/out workflows',
    description:
      'A MERN inventory system for product tracking, stock movements, and dashboard analytics with a modern dark UI.',
    problem:
      'Small teams need a lightweight way to track stock levels, record movements, and spot low inventory without spreadsheet chaos.',
    features: [
      'Dynamic inventory dashboard with live stock counts',
      'Stock in/out management with automated updates',
      'Product CRUD with category organization',
      'Responsive dark UI optimized for daily use',
    ],
    challenges: [
      'Kept stock counts consistent by updating inventory atomically on each in/out transaction.',
      'Built dashboard queries to surface low-stock items without heavy client-side computation.',
      'Balanced UX clarity with a dark theme suitable for extended operational use.',
    ],
    image: stock,
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Axios'],
    githubLink: 'https://github.com/Rathivarman-hub/stockZen',
    liveLink: 'https://stockzen-ims.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '4',
    slug: 'ev-charging-booking',
    title: 'EV Charging Station Booking',
    tagline: 'Real-time slot booking for EV charging stations across Tamil Nadu',
    description:
      'A full-stack MERN booking platform for EV charging stations with live slot availability, geospatial station discovery, role-based access, and transactional email notifications.',
    problem:
      'EV owners in Tamil Nadu need a reliable way to find nearby charging stations, check real-time slot availability, and reserve time slots without double-booking conflicts.',
    features: [
      'Real-time slot availability updates via Socket.IO on every booking and cancellation',
      'Date-based slot booking with double-booking prevention via MongoDB partial unique index',
      'Geospatial station discovery using MongoDB 2dsphere index and $near queries',
      'Admin dashboard with Recharts analytics and full station/booking management',
      'Transactional emails (confirmation, cancellation, OTP) via Resend with Nodemailer fallback',
    ],
    challenges: [
      'Prevented race-condition double bookings by combining server-side checks with a MongoDB partial unique index scoped to active booking statuses.',
      'Kept slot availability live by emitting Socket.IO slotUpdate events directly from booking and cancellation controllers.',
      'Built a dual email provider setup (Resend primary, Nodemailer fallback) to ensure reliable delivery across environments.',
      'Used static seed data for Tamil Nadu EV stations as a placeholder; real station data integration is planned for a future release.',
    ],
    image: evcharging,
    technologies: [
      'React 19',
      'Vite',
      'Bootstrap 5',
      'Framer Motion',
      'Recharts',
      'Socket.IO',
      'Node.js',
      'Express 5',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Resend',
      'Nodemailer',
    ],
    githubLink: 'https://github.com/Rathivarman-hub/EV-charging-website',
    liveLink: 'https://evcharging-one.vercel.app/',
    category: 'Full Stack',
    featured: true,
  },
];
