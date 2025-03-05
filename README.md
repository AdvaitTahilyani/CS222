# Student Ticket Marketplace

A web application for students to buy and sell tickets to campus events, concerts, sports games, and more. Built with Flask (backend) and React (frontend).

## Features

- Browse available tickets
- View detailed ticket information
- Purchase tickets
- Sell tickets by creating listings
- Track transactions

## Tech Stack

### Backend
- Flask: Python web framework
- SQLAlchemy: ORM for database interactions
- Flask-Migrate: Database migrations
- Flask-CORS: Cross-Origin Resource Sharing

### Frontend
- React: JavaScript library for building user interfaces
- TypeScript: Typed superset of JavaScript
- Material-UI: React component library
- React Router: Navigation for React applications
- Axios: HTTP client for API requests

## Project Structure

```
CS222/
├── backend/                # Flask backend
│   ├── app/                # Application package
│   │   ├── models.py       # Database models
│   │   ├── routes/         # API routes
│   │   ├── static/         # Static files
│   │   └── templates/      # HTML templates
│   ├── migrations/         # Database migrations
│   ├── .env                # Environment variables
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   └── run.py              # Application entry point
└── frontend/               # React frontend
    ├── public/             # Public assets
    ├── src/                # Source code
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── types/          # TypeScript types
    ├── package.json        # Node.js dependencies
    └── tsconfig.json       # TypeScript configuration
```

## Setup Instructions

### Prerequisites
- Python 3.10 or higher
- Node.js 14 or higher
- Conda (for environment management)

### Backend Setup

1. Create and activate the conda environment:
   ```bash
   conda create -n ticket-marketplace python=3.10
   conda activate ticket-marketplace
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

5. Run the Flask application:
   ```bash
   flask run
   ```

The backend API will be available at http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the React application:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000.

## API Endpoints

- `GET /api/tickets`: Get all available tickets
- `GET /api/tickets/<id>`: Get a specific ticket
- `POST /api/tickets`: Create a new ticket
- `POST /api/tickets/<id>/purchase`: Purchase a ticket

## Database Models

- **User**: Represents a user who can buy or sell tickets
- **Ticket**: Represents a ticket listing with event details
- **Transaction**: Represents a purchase transaction

## Future Enhancements

- User authentication and authorization
- User profiles
- Search and filtering for tickets
- Payment integration
- Email notifications
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details. 