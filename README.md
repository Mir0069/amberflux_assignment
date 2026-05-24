# AI Agent Governance Dashboard

A full-stack AI Agent Governance & Metering Dashboard built to simulate an enterprise-grade AI governance and monitoring platform.

The system helps organizations manage AI agents through:

* Governance controls
* Usage metering
* Audit logging
* Reliability monitoring
* Improvement recommendation logic

Built using:

* Node.js
* Express.js
* MongoDB
* React (Vite)
* Tailwind CSS

---

# Features

## Backend Features

* AI Agent Management
* Governance Approval & Blocking System
* Usage Metering APIs
* Audit Trail Logging
* Duplicate Request Prevention
* Reliability Monitoring
* Improvement Suggestion Engine
* MongoDB Persistence
* Request Validation
* RESTful APIs

---

## Frontend Features

* Modern Admin Dashboard
* Agent Governance Panel
* Usage Analytics Panel
* Audit Logs Viewer
* AI Improvement Suggestions Panel
* Responsive Tailwind UI
* Real-time API Integration

---

# Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | React + Vite         |
| Styling  | Tailwind CSS         |
| Backend  | Node.js + Express.js |
| Database | MongoDB              |
| ODM      | Mongoose             |

---

# Project Structure

```bash
project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── seed/
│   ├── app.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── vite.config.js
```

---

# Backend Setup

## 1. Navigate to Backend Folder

```bash
cd backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/agentGovernance
```

---

## 4. Start MongoDB

```bash
mongod
```

---

## 5. Start Backend Server

```bash
npm start
```

Backend will run on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to Frontend Folder

```bash
cd frontend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# API Documentation

---

# 1. Get All Agents

## Endpoint

```http
GET /agents
```

## Example Request

```bash
http://localhost:5000/agents
```

## Sample Response

```json
[
  {
    "name": "DocParser",
    "description": "Document parsing agent",
    "risk_level": "medium",
    "status": "allowed",
    "reliability_score": 91,
    "usage_count": 120
  }
]
```

---

# 2. Update Agent Decision

## Endpoint

```http
POST /agents/:name/decision
```

## Example Request

```bash
http://localhost:5000/agents/FraudDetector/decision
```

## Request Body

```json
{
  "decision": "blocked",
  "reason": "Low reliability score",
  "approved_by": "admin"
}
```

## Validation Rules

* Allowed decisions:

  * `allowed`
  * `blocked`
  * `pending_review`

* High-risk agents require a reason before approval.

---

# 3. Log Usage

## Endpoint

```http
POST /usage
```

## Example Request

```bash
http://localhost:5000/usage
```

## Request Body

```json
{
  "caller": "QuoteBuilder",
  "target": "DocParser",
  "units": 10,
  "cost": 0.25,
  "request_id": "REQ1001"
}
```

## Rules

* Blocked agents cannot be used.
* Unknown agents are rejected.
* Duplicate `request_id` values are ignored.
* Usage statistics are updated automatically.

---

# 4. Usage Summary

## Endpoint

```http
GET /usage-summary
```

## Example Request

```bash
http://localhost:5000/usage-summary
```

---

# 5. Audit Logs

## Endpoint

```http
GET /audit-log
```

## Example Request

```bash
http://localhost:5000/audit-log
```

## Logged Events

Examples include:

* `agent_allowed`
* `agent_blocked`
* `usage_logged`
* `usage_rejected`
* `duplicate_usage_ignored`
* `improvement_suggested`

---

# 6. Improvement Suggestions

## Endpoint

```http
GET /improvement-suggestions
```

## Example Request

```bash
http://localhost:5000/improvement-suggestions
```

## Suggestion Logic

Suggestions are generated based on:

* Low reliability scores
* High usage with low reliability
* High cost with low usage
* Frequent blocked usage attempts
* Pending review agents

---

# Seeded Sample Agents

The backend automatically seeds sample AI agents:

* DocParser
* QuoteBuilder
* MailAgent
* FraudDetector

Each agent includes:

* Governance states
* Usage statistics
* Audit logs
* Reliability scores
* Improvement suggestions

---

# Governance Rules

## Allowed Status Values

```txt
allowed
blocked
pending_review
```

---

# Usage Metering Rules

* Blocked agents cannot process requests.
* Unknown agents return validation errors.
* Duplicate requests are ignored using request IDs.
* Usage counts and billing data update automatically.

---

# Security & Reliability Concepts

This project also demonstrates:

* Tamper-resistant audit logging
* Governance enforcement
* Idempotency handling
* Reliability scoring
* Self-learning recommendation systems

---

# Future Improvements

* JWT Authentication
* Role-Based Access Control (RBAC)
* Redis Caching
* WebSocket Live Updates
* Docker Deployment
* Kubernetes Scaling
* CI/CD Integration
* AI-based anomaly detection

---

# Author

Developed as part of an AI Agent Governance & Metering System assignment.
