Database Schema
# MongoDB Collections and Fields

## 1. PACKAGES Collection
```

{
_id: ObjectId (auto-generated)
id: Number (required, unique) - Custom package ID
title: String (required) - Package title
location: String (required) - Destination location
duration: String (required) - Trip duration (e.g., "10 days")
price: String (required) - Price with currency (e.g., "€1,500")
originalPrice: String (optional) - Original price if discounted
image: String (required) - Main image URL/path
rating: Number (required) - Rating out of 5
reviews: Number (required) - Number of reviews
category: String (required) - Package category (Beach, Cultural, Adventure, etc.)
difficulty: String (required) - Difficulty level (Easy, Moderate, Hard)
groupSize: String (required) - Group size info (e.g., "2-8 people")
highlights: Array`<String>` (required) - Key highlights/features
description: String (required) - Package description
whyBook: String (required) - Why book this package
images: Array`<String>` (required) - Gallery images
included: Array`<Object>` (required) - What's included
- icon: String (required) - Icon name
- title: String (required) - Feature title
- description: String (required) - Feature description
sights: Array`<String>` (optional) - Notable sights (for some packages)
isActive: Boolean (required, default: true) - Package availability
createdAt: Date (required, auto-generated)
updatedAt: Date (required, auto-updated)
}

```plaintext

## 2. USERS Collection
```

{
_id: ObjectId (auto-generated)
email: String (required, unique) - User email
name: String (required) - Full name
image: String (optional) - Profile image URL
provider: String (required) - Auth provider ("google" | "email")
providerId: String (optional) - Provider account ID
emailVerified: Date (optional) - Email verification date
role: String (required, default: "user") - User role ("user" | "admin")
preferences: Object (optional) - User travel preferences
- interests: Array`<String>` (optional) - Travel interests
- budget: String (optional) - Budget preference
- travelStyle: String (optional) - Travel style preference
createdAt: Date (required, auto-generated)
updatedAt: Date (required, auto-updated)
}

```plaintext

## 3. BOOKINGS Collection
```

{
_id: ObjectId (auto-generated)
userId: ObjectId (required) - Reference to Users collection
packageId: Number (required) - Reference to package ID
status: String (required, default: "pending") - Booking status
- Values: "pending" | "confirmed" | "cancelled" | "completed"
paymentStatus: String (required, default: "pending") - Payment status
- Values: "pending" | "paid" | "failed" | "refunded"
paymentIntentId: String (optional) - Stripe payment intent ID
customerInfo: Object (required) - Customer information
- name: String (required) - Customer name
- email: String (required) - Customer email
- phone: String (optional) - Phone number
- travelers: Number (required) - Number of travelers
- specialRequests: String (optional) - Special requests
travelDates: Object (required) - Travel dates
- startDate: Date (required) - Trip start date
- endDate: Date (required) - Trip end date
pricing: Object (required) - Pricing information
- basePrice: Number (required) - Base price per person
- totalPrice: Number (required) - Total price for all travelers
- currency: String (required) - Currency code (e.g., "EUR")
- discount: Number (optional) - Discount amount
createdAt: Date (required, auto-generated)
updatedAt: Date (required, auto-updated)
}

```plaintext

## 4. CONTACTS Collection
```

{
_id: ObjectId (auto-generated)
name: String (required) - Contact name
email: String (required) - Contact email
phone: String (optional) - Phone number
subject: String (required) - Message subject
message: String (required) - Message content
inquiryType: String (required) - Type of inquiry
- Values: "general" | "booking" | "custom" | "existing" | "support" | "partnership"
status: String (required, default: "new") - Message status
- Values: "new" | "read" | "replied"
createdAt: Date (required, auto-generated)
updatedAt: Date (required, auto-updated)
}

```plaintext

## 5. CUSTOM_ITINERARIES Collection
```

{
_id: ObjectId (auto-generated)
customerInfo: Object (required) - Customer information
- name: String (required) - Customer name
- email: String (required) - Customer email
- phone: String (optional) - Phone number
- travelers: Number (required) - Number of travelers
travelDetails: Object (required) - Travel details
- destinations: String (required) - Preferred destinations
- startDate: Date (optional) - Preferred start date
- endDate: Date (optional) - Preferred end date
- budget: String (required) - Budget range
- accommodation: String (optional) - Accommodation preference
- travelStyle: String (optional) - Travel style preference
interests: Array`<String>` (required) - Selected interests
specialRequests: String (optional) - Special requests/notes
status: String (required, default: "new") - Request status
- Values: "new" | "in_progress" | "completed" | "cancelled"
createdAt: Date (required, auto-generated)
updatedAt: Date (required, auto-updated)
}

```plaintext

## 6. ACCOUNTS Collection (NextAuth)
```

{
_id: ObjectId (auto-generated)
userId: ObjectId (required) - Reference to Users collection
type: String (required) - Account type ("oauth")
provider: String (required) - Provider name ("google")
providerAccountId: String (required) - Provider account ID
refresh_token: String (optional) - OAuth refresh token
access_token: String (optional) - OAuth access token
expires_at: Number (optional) - Token expiration timestamp
token_type: String (optional) - Token type ("Bearer")
scope: String (optional) - OAuth scope
id_token: String (optional) - OAuth ID token
session_state: String (optional) - Session state
}

```plaintext

## 7. SESSIONS Collection (NextAuth)
```

{
_id: ObjectId (auto-generated)
sessionToken: String (required, unique) - Session token
userId: ObjectId (required) - Reference to Users collection
expires: Date (required) - Session expiration date
}

```plaintext

## 8. VERIFICATION_TOKENS Collection (NextAuth)
```

{
_id: ObjectId (auto-generated)
identifier: String (required) - Email or phone
token: String (required, unique) - Verification token
expires: Date (required) - Token expiration date
}

```plaintext

# INDEXES (Recommended for Performance)

## Packages Collection
- { id: 1 } - Unique index
- { category: 1, isActive: 1 }
- { rating: -1, reviews: -1 }
- { isActive: 1, createdAt: -1 }

## Users Collection
- { email: 1 } - Unique index
- { provider: 1, providerId: 1 }

## Bookings Collection
- { userId: 1, createdAt: -1 }
- { packageId: 1 }
- { status: 1, paymentStatus: 1 }
- { paymentIntentId: 1 }

## Contacts Collection
- { status: 1, createdAt: -1 }
- { email: 1 }

## Custom Itineraries Collection
- { "customerInfo.email": 1 }
- { status: 1, createdAt: -1 }

## NextAuth Collections
- { userId: 1 } - For accounts
- { sessionToken: 1 } - Unique for sessions
- { token: 1 } - Unique for verification_tokens

# ENVIRONMENT VARIABLES NEEDED

```

# MongoDB

MONGODB_URI=mongodb+srv://username:[password@cluster.mongodb.net](mailto:password@cluster.mongodb.net)/wanderwise

# NextAuth

NEXTAUTH_URL=[http://localhost:3001](http://localhost:3001)
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-public-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email (Optional)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your-email@gmail.com](mailto:your-email@gmail.com)
SMTP_PASS=your-app-password

```plaintext

# SAMPLE DATA STRUCTURE

## Sample Package Document
```json
{
  "_id": ObjectId("..."),
  "id": 1,
  "title": "Discover Sardinia – Your Tailored Escape",
  "location": "Sardinia, Italy",
  "duration": "10 days",
  "price": "€1,500",
  "originalPrice": "€1,800",
  "image": "/sardinia-turquoise-beach.png",
  "rating": 4.9,
  "reviews": 87,
  "category": "Beach",
  "difficulty": "Easy",
  "groupSize": "2-8 people",
  "highlights": ["Flight & Transfers", "Custom Accommodation", "Personalized Route"],
  "description": "Fall in love with Sardinia's turquoise beaches...",
  "whyBook": "This isn't a generic package...",
  "images": ["/sardinia-turquoise-beach.png", "/sardinia-costa-smeralda-beach.png"],
  "included": [
    {
      "icon": "Plane",
      "title": "Flight Tickets & Transfers",
      "description": "Round-trip flights + taxi to your apartment."
    }
  ],
  "isActive": true,
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

## Sample User Document

```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://example.com/avatar.jpg",
  "provider": "google",
  "providerId": "google-user-id",
  "emailVerified": ISODate("2024-01-01T00:00:00Z"),
  "role": "user",
  "preferences": {
    "interests": ["culture", "food", "nature"],
    "budget": "mid-range",
    "travelStyle": "balanced"
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```

## Sample Booking Document

```json
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "packageId": 1,
  "status": "confirmed",
  "paymentStatus": "paid",
  "paymentIntentId": "pi_stripe_payment_intent_id",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "travelers": 2,
    "specialRequests": "Vegetarian meals please"
  },
  "travelDates": {
    "startDate": ISODate("2024-06-01T00:00:00Z"),
    "endDate": ISODate("2024-06-11T00:00:00Z")
  },
  "pricing": {
    "basePrice": 1500,
    "totalPrice": 3000,
    "currency": "EUR",
    "discount": 0
  },
  "createdAt": ISODate("2024-01-01T00:00:00Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00Z")
}
```