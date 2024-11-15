
#  ทดสอบ Registration API

- URL: ```POST /api/auth/register ```

- Headers: ```Content-Type: application/json```

- Body:
```
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "securepassword123"
}
```

## ผลลัพธ์ที่คาดหวัง:

- หากการลงทะเบียนสำเร็จ ควรได้รับข้อมูลผู้ใช้งานใหม่ที่เพิ่งถูกสร้างขึ้น เช่น ```userId```, ```name```, และ ```email``` พร้อมกับ ```role``` ที่เป็น ```customer```

```
{
    "message": "User registered successfully",
    "user": {
        "id": 2,
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "$2b$10$iftGZjy8hkTjigGtMkj.XunIcDqRt/KnLix60UszvsVMcr0.Is1iu",
        "role": "customer",
        "createdAt": "2024-11-15T11:25:57.941Z"
    }
}

```

# ทดสอบ Login API

- URL: ```POST /api/auth/login```

- Headers: ```Content-Type: application/json```

- Body:
```
{
  "email": "testuser@example.com",
  "password": "securepassword123"
}
```

## ผลลัพธ์ที่คาดหวัง:

- หากล็อกอินสำเร็จ ควรได้รับ JWT token ใน response ซึ่งสามารถใช้เพื่อตรวจสอบสิทธิ์ในการเข้าถึง API อื่น ๆ ได้

- ตัวอย่าง Response:
```
{
  "accessToken": "<JWT_Token>"
}
```

# ทดสอบการเข้าถึง API ที่ต้องใช้ JWT (เช่น Customer Profile)
- URL: ```GET /api/customer/profile```
- Headers:
    - Content-Type: application/json
    - Authorization: Bearer <JWT_Token>

## ผลลัพธ์ที่คาดหวัง:
- หาก JWT ถูกต้อง ระบบจะคืนข้อมูลโปรไฟล์ของผู้ใช้งาน
- หาก JWT ไม่ถูกต้อง หรือไม่มี JWT ระบบควรคืนสถานะ 401 Unauthorized