# Restful-Booker Performance Testing

## 📘 Project Description

This project uses **Apache JMeter** to load and stress test the [Restful Booker API](https://restful-booker.herokuapp.com/). The following tasks were automated and tested:

1. **Login** to user using token authentication  
2. **Create Booking** with dynamic random data  
3. **Search Booking** by booking ID  

---

## 🚀 Scenario Description

- **Users:** 120,000 users simulated over a 12-hour period  
- **Actions:** Each user logs in, creates a booking, and searches for that booking  
- **Tool:** Apache JMeter with Gaussian Random Timer (2000ms deviation, 500ms delay)  
- **Phases:**
  - 🔹 Load Test (3 Steps):  
    - 5 min Load  
    - 10 min Load  
    - 20 min Load  
  - 🔹 Stress Test: Gradually increase users until server failure or bottleneck
---

## 🛠️ Technology Stack

- Apache JMeter (v5.6+ recommended)  
- Java 8 or 11  
- HTML Report Generator (Built-in JMeter report generation)  
- Excel for result summary
---

## ⚙️ Prerequisites

- JMeter installed and added to system path  
- Java 11 or Java 17 installed  
- Git installed (optional for cloning repo)
