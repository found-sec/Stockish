
<div align="left">
  <a href="https://github.com/found-sec/Stockish">
    <img src="https://github.com/user-attachments/assets/b96987cb-c2e0-4186-a922-383e50fd8f87" alt="Stockish Banner" width="100%">
  </a>

  ![GitHub License](https://img.shields.io/github/license/found-sec/Stockish)
  ![GitHub repo size](https://img.shields.io/github/repo-size/found-sec/Stockish)
  ![Website](https://img.shields.io/website?url=https%3A%2F%2Fstockish.vercel.app)
</div>


# Stockish 📈  
An educational stock simulator app based on Spikecodes' [Stotra](https://github.com/spikecodes/stotra). Built within 6 hours during a coding marathon.  

---

## ✨ Features  
- 📊 **Real-time inventory tracking**  
- 🚨 **Automated stock level alerts**  
- 📑 **Detailed reporting and analytics**  
- 🖥️ **User-friendly interface**  

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/c49c3113-473f-43f5-bb66-54d835776e11" width="300">
      <br>Landing Page
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/9011391e-66ba-464c-a46a-9ccce5449092" width="300">
      <br>Dashboard
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/944bacf1-9ebc-4147-a576-e00f9e91396d" width="300">
      <br>Markets
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/39c175df-1c8f-4b2c-ba0e-a2a1d2f0c4d6" width="300">
      <br>Leaderboard
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/a36f1d02-e18c-47e0-8278-226b0820d5e7" width="300">
      <br>Guide
    </td>
  </tr>
</table>


---

## 🚀 Getting Started  
### Clone this repository:  
```bash
git clone https://github.com/foundsec/Stockish.git

```
## 🛠️ Prerequisites
1.Install node modules in root
```node
cd Stockish
```
```node
npm install
```

2.Install node modules in server
```node
cd server
```
```node
npm install
```
2. Install node modules in app
 ```node
cd app
```
```node
npm install
```


## 🖥️ Running the website on localhost
1. Go to app dir and run
  ```node
cd /app
```
  ```node
npm run dev
```
2. Go to server dir and run
  ```node
cd /server
```
  ```node
npm run dev
```


## 🚀 Deploying to Production with Vercel
Step 1: Install the Vercel CLI (if you haven't already)
To deploy your project to Vercel, you need to install the Vercel CLI. If you don't have it installed, run the following command:

  ```node
npm install -g vercel

```
Step 2: Log into Vercel
Run the following command to log into your Vercel account (or sign up if you don’t have one yet):
  ```node
vercel login
  ```

Step 3: Deploy the Frontend (App)
   1. Go to the app directory:
      ```node
      cd app
      ```
  2. Run the Vercel deploy command:
      ```node
      vercel
     ```

Alternatively, Vercel GUI can be used, visit  <a href="https://vercel.com/">Vercel</a> and start a new project, you need to fork this repository for that purpose and inport it in vercel and deploy.


