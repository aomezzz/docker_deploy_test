# Restaurant Management Full Stack App

โปรเจกต์นี้เป็นแอปพลิเคชันสำหรับจัดการร้านอาหาร (Full Stack) ประกอบด้วยส่วนของ Frontend ที่สร้างด้วย React และส่วนของ Backend ที่เป็น RESTful API สร้างด้วย Node.js, Express และเชื่อมต่อกับฐานข้อมูล PostgreSQL ทั้งหมดทำงานอยู่บน Docker

## Features

- **การยืนยันตัวตนผู้ใช้ (Authentication)**: สมัครสมาชิก (Register), เข้าสู่ระบบ (Login)
- **ระบบ Role**: ผู้ใช้มี Role ต่างๆ เช่น User, Moderator, Admin
- **จัดการร้านอาหาร (CRUD)**:
  - ดูรายการร้านอาหารทั้งหมด
  - ดูรายละเอียดร้านอาหาร
  - เพิ่มร้านอาหารใหม่
  - แก้ไขข้อมูลร้านอาหาร (สำหรับ Moderator และ Admin)
  - ลบร้านอาหาร (สำหรับ Admin)
- **Authorization**: จำกัดการเข้าถึง API ตาม Role ของผู้ใช้

## Tech Stack

**Client (Frontend):**
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS

**Server (Backend):**
- Node.js
- Express.js
- Sequelize (PostgreSQL ORM)
- PostgreSQL
- JSON Web Token (JWT) สำหรับ Authentication
- Bcrypt.js สำหรับ Hashing รหัสผ่าน

**DevOps:**
- Docker & Docker Compose

## การติดตั้งและใช้งาน (Getting Started)

โปรเจกต์นี้ถูกออกแบบมาให้ทำงานบน Docker ทำให้ง่ายต่อการติดตั้งและรัน

### 1. Prerequisites

- ติดตั้ง [Docker](https://www.docker.com/get-started) และ Docker Compose

### 2. Environment Variables

สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ โดยคัดลอกเนื้อหาจากด้านล่างและเปลี่ยนค่า `your-secret-key` เป็นค่าที่ต้องการ

```env
# Server Configuration
SERVER_PORT=5555

# Database Configuration
HOST=db
USER=postgres
PASSWORD=postgres
DB_NAME=app_db
DB_PORT=5432

# JWT Secret
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400 # 24 hours

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 3. รันโปรเจกต์

เปิด Terminal และรันคำสั่งต่อไปนี้ที่ root ของโปรเจกต์:

```bash
docker-compose up --build
```

- **Client** จะทำงานที่ `http://localhost:5173`
- **Server** จะทำงานที่ `http://localhost:5555`

## API Endpoints

### Authentication (`/api/auth`)

- `POST /signup`: สมัครสมาชิกผู้ใช้ใหม่
- `POST /signin`: เข้าสู่ระบบ

### Restaurants (`/api/v1/restaurants`)

- `GET /`: ดูร้านอาหารทั้งหมด (ต้อง Login)
- `POST /`: เพิ่มร้านอาหารใหม่
- `GET /:id`: ดูรายละเอียดร้านอาหารตาม ID (ต้อง Login)
- `PUT /:id`: แก้ไขข้อมูลร้านอาหาร (สำหรับ Moderator, Admin)
- `DELETE /:id`: ลบร้านอาหาร (สำหรับ Admin)

---

## คู่มือไฟล์และขั้นตอนการทำงานอย่างละเอียด

### ภาพรวมและลำดับความสำคัญ

โปรเจกต์นี้ใช้ **Docker** เป็นหัวใจหลักในการทำงาน มันจะสร้างสภาพแวดล้อมจำลอง (container) สำหรับแต่ละส่วน (Client, Server, Database) ทำให้เราไม่ต้องติดตั้งโปรแกรมต่างๆ (เช่น Node.js, PostgreSQL) บนเครื่องคอมพิวเตอร์ของเราโดยตรง

**สิ่งที่ต้องทำเป็นอันดับแรกสุด คือการตั้งค่าไฟล์ `.env`** เพราะเป็นไฟล์ที่เก็บข้อมูลสำคัญที่ทุกส่วนต้องใช้

---

### 1. ไฟล์และโฟลเดอร์ในระดับบนสุด (Root Directory)

#### `docker-compose.yml` (ไฟล์ที่สำคัญที่สุด)
*   **หน้าที่:** เป็น "พิมพ์เขียว" หรือ "แผนผังหลัก" ของโปรเจกต์ทั้งหมด สั่งให้ Docker สร้างและเชื่อมต่อบริการ (service) ต่างๆ เข้าด้วยกัน
*   **รายละเอียด:**
    *   `services:`: ในไฟล์นี้จะกำหนดไว้ 3 services คือ `server`, `client`, และ `db` (ฐานข้อมูล PostgreSQL)
    *   ไฟล์นี้จะกำหนดค่าต่างๆ เช่น port ที่ใช้, การเชื่อมต่อ volume (เพื่อให้แก้โค้ดแล้วมีผลทันที), และการตั้งค่า environment variables สำหรับแต่ละ service
*   **ต้องทำอะไรกับไฟล์นี้?:** โดยปกติแล้วไม่ต้องแก้ไขอะไร นอกจากต้องการเปลี่ยน port หรือเพิ่ม service ใหม่

#### `.env` (ไฟล์ที่ต้องตั้งค่าเป็นอันดับแรก)
*   **หน้าที่:** เก็บข้อมูลที่เป็นความลับหรือข้อมูลที่เปลี่ยนแปลงตามสภาพแวดล้อม
*   **รายละเอียด:**
    *   `SERVER_PORT`: Port ที่ฝั่ง Server จะทำงาน
    *   `HOST`, `USER`, `PASSWORD`, `DB_NAME`, `DB_PORT`: ข้อมูลสำหรับเชื่อมต่อกับฐานข้อมูล PostgreSQL
    *   `JWT_SECRET`: "กุญแจลับ" สำหรับสร้างและตรวจสอบ Token ของผู้ใช้ (สำคัญมากในระบบ Login)
*   **ต้องทำอะไรกับไฟล์นี้?:** **คุณต้องสร้างไฟล์นี้ขึ้นมาเอง** โดยคัดลอกเนื้อหาจากใน `README.md` ส่วนของ "Environment Variables" แล้วเปลี่ยนค่า `JWT_SECRET` เป็นข้อความลับของคุณเอง

---

### 2. โฟลเดอร์ `server` (Backend API)

*   **`Dockerfile.server`**: คำสั่งสำหรับ Docker เพื่อ "สร้าง" container ของ Server
*   **`package.json`**: จัดการรายการ library (dependencies) ที่ Server ต้องใช้ เช่น `express`, `sequelize`, `jsonwebtoken`
*   **`index.js`**: เป็นไฟล์เริ่มต้น (Entry Point) ของ Server
*   **`config/`**: เก็บไฟล์ตั้งค่าต่างๆ เช่น การเชื่อมต่อฐานข้อมูล
*   **`controllers/`**: เก็บไฟล์ที่จัดการ Logic หลักของโปรแกรม เช่น ฟังก์ชันสำหรับ Register, Login, เพิ่ม/ลบ/แก้ไขข้อมูลร้านอาหาร
*   **`middleware/`**: เก็บโค้ดที่ทำงาน "คั่นกลาง" เพื่อตรวจสอบบางอย่างก่อน เช่น `authjwt.js` จะทำหน้าที่ตรวจสอบ Token ก่อนว่าผู้ใช้มีสิทธิ์เข้าถึงข้อมูลหรือไม่
*   **`model/`**: กำหนดโครงสร้างของข้อมูลที่จะเก็บลงฐานข้อมูล (เช่น User, Role, Restaurant)
*   **`Routes/`**: กำหนดเส้นทาง (URL Path) ของ API และจับคู่กับฟังก์ชันใน Controller

---

### 3. โฟลเดอร์ `client` (Frontend - React App)

*   **`Dockerfile.client`**: คำสั่งสำหรับ Docker เพื่อ "สร้าง" container ของ Client
*   **`package.json`**: จัดการ dependencies ของฝั่ง Client เช่น `react`, `vite`, `axios`, `tailwindcss`
*   **`src/main.jsx`**: เป็นไฟล์เริ่มต้น (Entry Point) ของแอป React
*   **`src/Pages/`**: เก็บไฟล์ Component ของแต่ละหน้าเว็บ เช่น `Home.jsx`, `LoginPage.jsx`
*   **`src/Component/`**: เก็บไฟล์ Component ที่สามารถนำไปใช้ซ้ำได้ในหลายๆ หน้า เช่น `Navbar.jsx`, `Card.jsx`
*   **`src/service/`**: เก็บไฟล์ที่ทำหน้าที่สื่อสารกับ Backend API โดยเฉพาะ (ใช้ `axios` ในการยิง request)
*   **`src/context/`**: ใช้สำหรับเก็บ State ส่วนกลางที่ใช้ร่วมกันทั้งแอป เช่น ข้อมูลการ Login ของผู้ใช้

---

### สรุปขั้นตอนการทำงาน (Step-by-Step) อีกครั้ง

1.  **ติดตั้ง Docker:** ตรวจสอบให้แน่ใจว่าคุณมี Docker และ Docker Compose ติดตั้งบนเครื่องแล้ว
2.  **สร้างไฟล์ `.env`:** ที่ root directory ของโปรเจกต์ สร้างไฟล์ชื่อ `.env` ขึ้นมา คัดลอกเนื้อหาจากส่วน "Environment Variables" ใน `README.md` มาวาง และ **เปลี่ยนค่า `JWT_SECRET`**
3.  **สั่งให้ Docker ทำงาน:** เปิด Terminal ที่ root directory ของโปรเจกต์ แล้วรันคำสั่ง:
    ```bash
    docker-compose up --build
    ```
    *คำสั่งนี้จะสร้างและรันทุกอย่างขึ้นมาโดยอัตโนมัติ อาจใช้เวลาสักครู่ในครั้งแรก*
4.  **เข้าใช้งาน:**
    *   เปิดเว็บเบราว์เซอร์ไปที่ `http://localhost:5173` เพื่อดูหน้าเว็บ (Client)
    *   Server API จะทำงานอยู่ที่ `http://localhost:5555`