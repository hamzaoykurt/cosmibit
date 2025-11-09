# CosmiBit Backend - Spring Boot API

Headless REST API for the CosmiBit corporate website.

## Technology Stack

- **Spring Boot** 3.2.0
- **Spring Data MongoDB** - NoSQL database integration
- **Spring Security** - API security and CORS configuration
- **Jakarta Validation** - Input validation
- **Lombok** - Cleaner code with annotations

## API Documentation

### Base URL
```
http://localhost:8080/api/v1
```

### Endpoints

#### Projects
- **GET** `/projects` - Get all projects
- **GET** `/projects/{id}` - Get project by ID
- **GET** `/projects/status/{status}` - Filter projects by status

#### Team
- **GET** `/team` - Get all team members
- **GET** `/team/{id}` - Get team member by ID

#### Services
- **GET** `/services` - Get all services
- **GET** `/services/{id}` - Get service by ID

#### Contact
- **POST** `/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to discuss a project..."
  }
  ```

## Running the Application

### Using Maven
```bash
mvn spring-boot:run
```

### Using Java
```bash
mvn clean package
java -jar target/cosmibit-backend-0.0.1-SNAPSHOT.jar
```

## Configuration

Edit `src/main/resources/application.properties`:

```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/cosmibit

# Frontend URL (CORS)
cosmibit.frontend.url=http://localhost:3000

# Server Port
server.port=8080
```

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community  # macOS
# or
sudo apt install mongodb  # Ubuntu

# Start MongoDB
brew services start mongodb-community  # macOS
# or
sudo systemctl start mongodb  # Ubuntu
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/cosmibit
   ```

## Security

- **CORS**: Configured to allow requests only from the frontend URL
- **Public Endpoints**: All GET endpoints are public
- **Protected Endpoints**: Future admin endpoints will require authentication

## Development Tips

- Use **Spring Boot DevTools** for hot reload
- Test endpoints with **Postman** or **curl**
- Check logs for MongoDB connection status
- Use MongoDB Compass for database visualization
