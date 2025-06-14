## Dmoney-Performance

## Project Scenario (Request):

This JMeter test simulates realistic user activity within the Dmoney system. The following transactional scenarios were executed:

- ✅ **Login to user account**  
  - A single login request was successfully executed to authenticate the user.

- ✅ **Deposit Transactions**  
  - Simulated 5 agents depositing money to 10 different customers.  
  - A total of 50 deposit requests were successfully executed.

- ✅ **Send Money Transactions**  
  - Simulated 5 customers sending money to 10 other customers.  
  - A total of 50 money transfer requests were performed without errors.

- ✅ **Payment Transactions**  
  - Simulated 5 customers making payments to 2 different merchants.  
  - A total of 10 merchant payment requests were processed.

## Technology and Tool Used
  - Apache Jmeter
  - JAVA 17(LTS)
 
## Prerequisite
  - Jmeter must be installed
  - JAVA 11 or 17 must be installed
  
## How to run this project
  - Clone this project
  - Copy the Dmoney.jmx file and place it in the bin folder of the Jmeter installation location
  - Run the project by opening the Dmoney.jmx file in Jmeter
  
## How to generate report
  - Delete the previously Report folder from the project 
  - Open command promt in bin folder of the Jmeter installation location
  - hit this command: jmeter -n -t .\Dmoney.jmx -l Dmoney.jtl -e -o Reports
   
## Report of load testing
![image](https://github.com/user-attachments/assets/fffa9d5f-1c7d-4388-a021-7850efd712ae)

## Test Plan
![image](https://github.com/user-attachments/assets/59a126c8-a688-441d-907a-9b89841f4c30)

## View Result Tree
![image](https://github.com/user-attachments/assets/f70a35ce-85f9-4336-a62b-de47d888fe9c)

## Summary Report
![image](https://github.com/user-attachments/assets/f3138b2d-e3c2-4cf0-8157-e9bf233b9e84)

**Note:** This test did not include user creation, agent registration, balance funding from the system, or user deletion. It focuses purely on existing users performing transaction operations under load.
