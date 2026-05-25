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
<div align="center">

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/33230b62-d235-4ff8-acc6-1f3fbd600142" width="400"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/d38f3015-62f1-4a12-b337-de7bb1ddabf9" width="400"/>
    </td>
  </tr>

  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/cc6fcdfa-b3c4-4d34-b1ae-37d3d3ce5ad1" width="400"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/12565ebb-07dd-4b63-b7c0-afe2b74fb6b6" width="400"/>
    </td>
  </tr>

  <tr>
    <td colspan="2" align="center">
      <img src="https://github.com/user-attachments/assets/92f372a6-8d00-4eab-b7b1-3b33f186bc51" width="800"/>
    </td>
  </tr>
</table>

</div>





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
https://amberflux-assignment-fs6x.onrender.com
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
https://amberflux-assignment-fs6x.onrender.com/agents
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
https://amberflux-assignment-fs6x.onrender.com/agents/FraudDetector/decision
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
https://amberflux-assignment-fs6x.onrender.com/usage
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
https://amberflux-assignment-fs6x.onrender.com/usage-summary
```

---

# 5. Audit Logs

## Endpoint

```http
GET /audit-log
```

## Example Request

```bash
https://amberflux-assignment-fs6x.onrender.com/audit-log
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
https://amberflux-assignment-fs6x.onrender.com/improvement-suggestions
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
* CI/CD Integration
---
# **Note**:
**This is a prototype and not a production-ready feature. Please treat this as a template/reference implementation only, and not as a finalised production-ready interface or component.**
