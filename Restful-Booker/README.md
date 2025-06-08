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
- Java 8 or Java 11 installed  
- Git installed (optional for cloning repo)

---

## ▶️ How to Run This Project

1. Clone the repository  
2. Open `booking.jmx` in JMeter  
3. Run using GUI or from CLI

## How to generate report
Delete the previously Report folder from the project
Open command promt in bin folder of the Jmeter installation location
hit this command: jmeter -n -t .\Restful-booker.jmx -l restfulbooker-performance.csv -e -o Reports

## Report of load testing

## Test Plan

## View Result Tree

## Summery Report
