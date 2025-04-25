<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NestJS DSR API Documentation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2rem;
      line-height: 1.6;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    code {
      background-color: #eee;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 90%;
    }
    pre {
      background-color: #eee;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
    ul {
      padding-left: 1.5rem;
    }
  </style>
</head>
<body>

  <h1>📘 NestJS DSR API</h1>
  <p><strong>DSR (Daily Status Report)</strong> API built using NestJS, PostgreSQL, Sequelize, JWT Authentication, AWS S3 for profile uploads, and Swagger for API documentation.</p>

  <h2>🔧 Technologies Used</h2>
  <ul>
    <li><strong>NestJS</strong> - Node.js framework</li>
    <li><strong>PostgreSQL</strong> - Relational database</li>
    <li><strong>Sequelize</strong> - ORM for PostgreSQL</li>
    <li><strong>JWT</strong> - JSON Web Token authentication</li>
    <li><strong>AWS S3</strong> - Profile image upload and storage</li>
    <li><strong>Swagger</strong> - API documentation</li>
    <li><strong>TypeScript</strong> - Superset of JavaScript</li>
  </ul>

  <h2>📂 Folder Structure</h2>
  <pre><code>src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
├── users/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.model.ts
├── dsr/
│   ├── dsr.controller.ts
│   ├── dsr.service.ts
│   ├── dsr.model.ts
├── profile/
│   ├── profile.controller.ts
│   ├── profile.service.ts
├── common/
│   ├── s3.service.ts
├── main.ts
</code></pre>

  <h2>🚀 Getting Started</h2>
  <h3>1. Clone the repository</h3>
  <pre><code>git clone https://github.com/your-username/dsr-api.git
cd dsr-api</code></pre>

  <h3>2. Install dependencies</h3>
  <pre><code>npm install</code></pre>

  <h3>3. Create your environment variables</h3>
  <p>Create a <code>.env</code> file in the root with the following structure:</p>
  <pre><code>PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/dsrdb
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
</code></pre>

  <h3>4. Run migrations and seed (if any)</h3>
  <pre><code>npm run build
npm run start:dev</code></pre>

  <h2>🧪 API Endpoints</h2>

  <h3>🔐 Auth</h3>
  <ul>
    <li>POST <code>/auth/signup</code></li>
    <li>POST <code>/auth/login</code></li>
    <li>POST <code>/auth/forgot-password</code></li>
    <li>POST <code>/auth/send-otp</code></li>
    <li>POST <code>/auth/verify-otp</code></li>
  </ul>

  <h3>📝 DSR (Daily Status Report)</h3>
  <ul>
    <li>POST <code>/users/api/v1/dsr</code> - Add new DSR (Max 8 hours/day)</li>
    <li>PUT <code>/users/api/v1/dsr</code> - Update DSR content/hours</li>
    <li>GET <code>/users/api/v1/dsr</code> - List DSRs (with pagination and filters)</li>
    <li>GET <code>/users/api/v1/dsr/:dsrId</code> - Get DSR by ID</li>
  </ul>

  <h3>👤 Profile</h3>
  <ul>
    <li>GET <code>/profile</code> - Get current user profile</li>
    <li>PUT <code>/profile</code> - Update name/profilePic</li>
    <li>POST <code>/profile/upload</code> - Upload profile picture to S3</li>
  </ul>

  <h2>📚 Swagger Docs</h2>
  <p>Once running, access full API documentation at:</p>
  <pre><code>http://localhost:3000/api-docs</code></pre>

  <h2>📦 Scripts</h2>
  <ul>
    <li><code>npm run start</code> – Start server</li>
    <li><code>npm run start:dev</code> – Start server in watch mode</li>
    <li><code>npm run build</code> – Compile project</li>
  </ul>

  <h2>✍️ Contribution</h2>
  <p>Contributions and improvements are welcome! Feel free to fork this repo or open issues.</p>

  <h2>📄 License</h2>
  <p>This project is licensed under the MIT License.</p>

</body>
</html>
