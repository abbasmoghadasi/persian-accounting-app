# حسابداری شخصی

یک اپلیکیشن حسابداری شخصی local-first برای اندروید و وب، با رابط کاربری فارسی.

## ساختار پروژه

```
persian-accounting-app/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + TypeScript + Fastify
├── docs/              # مستندات
├── package.json       # اسکریپت‌های root
└── .gitignore
```

## پیش‌نیازها

- Node.js >= 20
- npm >= 10

## نصب وابستگی‌ها

```bash
npm run install:all
```

## اجرا در محیط توسعه

اجرای همزمان frontend و backend:

```bash
npm run dev
```

یا به صورت جداگانه:

```bash
# فقط backend (پورت 3000)
npm run dev:backend

# فقط frontend (پورت 5173)
npm run dev:frontend
```

## تست سلامت سرور

```bash
curl http://localhost:3000/api/health
```

## مستندات

- [معماری پروژه](docs/architecture.md)
