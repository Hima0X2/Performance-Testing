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
2. Open `5-min-Booking.jmx/10-min-Booking.jmx/20-min-Booking.jmx` in JMeter  
3. Run using GUI or from CLI

## How to generate report
Delete the previously Report folder from the project
Open command promt in bin folder of the Jmeter installation location
hit this command: jmeter -n -t .\*-min-Booking.jmx.jmx -l *-min-Booking.jtl -e -o Reports

## Report of load testing
#### 5 Min Load Testing:
![image](https://github.com/user-attachments/assets/9e74cea9-d9dd-468f-9bdf-2a204f7489b7)

#### 5 Min Stress Testing:
![image](https://github.com/user-attachments/assets/05eae522-df60-4db0-bf71-93057e94f2da)

#### 10 Min Load Testing:
![image](https://github.com/user-attachments/assets/1dabd632-7f8e-44cd-ac5f-5d5afdc00767)

#### 20 Min Load Testing:
![image](https://github.com/user-attachments/assets/0c8ce14e-0d25-48a1-b006-4152c5b7362e)

## Test Plan
#### 5 Min Load Testing:
![image](https://github.com/user-attachments/assets/2b65b516-98b0-405e-a0c6-810a86e56bc6)

#### 5 Min Stress Testing:
![image](https://github.com/user-attachments/assets/fe2287de-d20d-4842-a572-2a9921980396)

#### 10 Min Load Testing:
![image](https://github.com/user-attachments/assets/a5a13c4b-6168-478e-9257-cdbde6012985)

#### 20 Min Load Testing:
![image](https://github.com/user-attachments/assets/3d28022c-2539-485c-8dab-636812555e79)

