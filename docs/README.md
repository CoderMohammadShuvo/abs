# ABS Backend API Documentation

This directory contains comprehensive API documentation for the ABS (Academic & Business Solutions) backend system.

## 📁 Files

- **`postman-collection.json`** - Postman collection for testing all API endpoints
- **`swagger.yaml`** - OpenAPI 3.0 specification for API reference
- **`README.md`** - This file

## 🚀 Quick Start

### Using Postman Collection

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select `postman-collection.json`
   - The collection will be imported with all endpoints organized by category

2. **Set Environment Variables**
   - The collection uses two variables:
     - `baseUrl`: Default is `http://localhost:3000`
     - `token`: Auto-populated after login
   
3. **Test the APIs**
   - Start with the **Authentication > Login** request
   - Use test credentials:
     - **Super Admin**: `admin@abs.com` / `Admin@123`
     - **Teacher**: `teacher@abs.com` / `Teacher@123`
     - **Student**: `student@abs.com` / `Student@123`
   - The login request automatically saves the JWT token
   - All protected endpoints will use this token automatically

### Using Swagger Documentation

1. **View in Swagger Editor**
   - Go to [editor.swagger.io](https://editor.swagger.io/)
   - Copy the contents of `swagger.yaml`
   - Paste into the editor
   - View the interactive documentation

2. **Or Use Swagger UI Locally**
   ```bash
   # Install Swagger UI
   npm install -g swagger-ui-watcher
   
   # Run Swagger UI
   swagger-ui-watcher docs/swagger.yaml
   ```

3. **Or Integrate with Next.js**
   ```bash
   # Install dependencies
   npm install swagger-ui-react swagger-ui-dist
   
   # Create a page at app/api-docs/page.tsx
   # Import and render SwaggerUI component
   ```

## 📚 API Categories

### 1. Authentication
- User registration
- Login/Logout
- Profile management
- Password change
- Token refresh

### 2. Admin - Users
- List users with pagination and filters
- Create/Update/Delete users
- Change user roles (SUPER_ADMIN only)
- Dashboard statistics

### 3. Courses
- List courses with filters
- Create/Update/Delete courses
- Course modules management
- Course reviews
- Categories management

### 4. Modules & Content
- Module details
- Add/Update/Delete content
- Media management
- Quiz integration

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

### Getting a Token

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@abs.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "email": "admin@abs.com",
      "role": "SUPER_ADMIN"
    }
  }
}
```

## 🎯 Role-Based Access Control

Different endpoints require different roles:

| Role | Access Level |
|------|-------------|
| `SUPER_ADMIN` | Full access to all endpoints |
| `ADMIN` | User management, course management |
| `TEACHER` | Create/manage own courses and content |
| `STUDENT` | Enroll in courses, submit reviews |
| `VISITOR` | Public endpoints only |

## 📝 Example Requests

### Create a Course

```bash
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction to Web Development",
  "slug": "intro-web-dev",
  "description": "Learn the basics of web development",
  "level": "Beginner",
  "isPaid": true,
  "price": 99.99,
  "duration": 40,
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "categoryIds": ["category-id-1", "category-id-2"]
}
```

### Add Content to Module

```bash
POST /api/modules/{moduleId}/contents
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Introduction Video",
  "description": "Welcome to the course",
  "type": "VIDEO",
  "videoUrl": "https://example.com/video.mp4",
  "duration": 600,
  "order": 1
}
```

### List Users with Filters

```bash
GET /api/admin/users?page=1&limit=10&role=STUDENT&search=john
Authorization: Bearer <token>
```

## 🔄 Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Validation Error Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

## 🧪 Testing Tips

1. **Always login first** to get a valid token
2. **Use the correct role** for each endpoint
3. **Check response status codes**:
   - `200` - Success
   - `201` - Created
   - `400` - Bad Request
   - `401` - Unauthorized
   - `403` - Forbidden
   - `404` - Not Found
   - `409` - Conflict
   - `500` - Server Error

4. **Test pagination** by varying `page` and `limit` parameters
5. **Test filters** to ensure they work correctly
6. **Verify soft deletes** don't return deleted items

## 📞 Support

For issues or questions about the API:
- Check the Swagger documentation for detailed endpoint information
- Review the Postman collection examples
- Contact the development team

## 🔗 Related Resources

- [Prisma Schema](../prisma/schema.prisma)
- [Environment Variables](../.env.example)
- [Seed Data](../prisma/seed.ts)
