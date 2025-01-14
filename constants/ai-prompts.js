const docs = `
# 🚀 Kontas Framework Documentation

Kontas adalah framework web minimalis berbasis Bun yang fokus pada kesederhanaan & performa tinggi.

## Table of Contents
1. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Basic Setup](#basic-setup)
   - [Project Structure](#project-structure)

2. [Basic Features](#basic-features)
   - [Simple Routing](#simple-routing)
   - [Basic Response Types](#basic-response-types)
   - [Simple Middleware](#simple-middleware)

3. [Intermediate Features](#intermediate-features)
   - [Dynamic Routes](#dynamic-routes)
   - [Query Parameters](#query-parameters)
   - [Route Patterns](#route-patterns)
   - [Context API](#context-api)
   - [Error Handling](#error-handling)

4. [Advanced Features](#advanced-features)
   - [Complex Routing](#complex-routing)
   - [Advanced Configuration](#advanced-configuration)
   - [Advanced Middleware](#advanced-middleware)
   - [Advanced Error Handling](#advanced-error-handling)

5. [Security Features](#security-features)
   - [Rate Limiting](#rate-limiting)
   - [Security Headers](#security-headers)
   - [CSRF Protection](#csrf-protection)
   - [Input Sanitization](#input-sanitization)

6. [Development Features](#development-features)
   - [Hot Reload](#hot-reload)
   - [Port Management](#port-management)
   - [Route Summary](#route-summary)

7. [Example Implementations](#example-implementations)

## Getting Started

### Installation
\`\`\`bash
bun add kontas
\`\`\`

### Basic Setup
\`\`\`typescript
// app.ts
import { Kontas } from "kontas";

const app = new Kontas();
app.start(3000); // default port: 3000
\`\`\`

### Project Structure
Kontas menggunakan file-based routing yang simple & powerful:
1. \`./routes\` & \`./middleware.ts\` (default)
2. \`./src/routes\` & \`./src/middleware.ts\` (fallback)
3. Custom path via config

## Basic Features

### Simple Routing
\`\`\`typescript
// routes/serve.ts
export async function GET(ctx: Context) {
    return { message: "Hello World!" };
}
\`\`\`

### Basic Response Types

1. Object (auto-JSON)
\`\`\`typescript
return { status: "success" };
\`\`\`

2. Config Format
\`\`\`typescript
return {
    data: { status: "success" },
    config: {
        headers: { 'X-Custom': 'Value' },
        status: 201
    }
};
\`\`\`

3. Raw Response
\`\`\`typescript
return new Response('Hello', {
    headers: { 'Content-Type': 'text/plain' }
});
\`\`\`

### Simple Middleware
\`\`\`typescript
// middleware.ts
import type { MiddlewareFunction } from "kontas";

const auth: MiddlewareFunction = async (ctx) => {
    const token = ctx.request.headers.get('Authorization');
    if (!token) return new Response('Unauthorized', { status: 401 });
    ctx.user = { id: 1, role: 'user' };
};

export default [
    {
        middlewares: [auth],
        paths: ['/products']
    }
];
\`\`\`

## Intermediate Features

### Dynamic Routes
\`\`\`typescript
// routes/users/[id]/serve.ts
export async function GET(ctx: Context) {
    const { id } = ctx.params;  // string
    return { userId: id };
}
\`\`\`

### Query Parameters
\`\`\`typescript
// routes/products/serve.ts
export async function GET(ctx: Context) {
    // /products?sort=desc&filter=active
    const sort = ctx.query.get('sort');      // 'desc'
    const filter = ctx.query.get('filter');  // 'active'
    
    // Multiple values
    // /products?tags=js&tags=ts
    const tags = ctx.query.getAll('tags');   // ['js', 'ts']
    
    return { sort, filter, tags };
}
\`\`\`

### Route Patterns
Kontas mendukung beberapa pattern routing:
- \`/about\` -> Static route
- \`/users/[id]\` -> Dynamic route
- \`/blog/[...slug]\` -> Catch-all route
- \`/products/[id]/reviews/[reviewId]\` -> Nested dynamic
- Query string otomatis tersedia via \`ctx.query\`

### Context API
\`Context<T>\` menyediakan:
- \`params\`: Route parameters (string | string[])
- \`query\`: URLSearchParams (dari query string)
- \`request\`: Raw Request
- \`body?\`: Request body (type T)
- \`user?\`: Custom user data
- \`headers\`: Response headers
- \`setHeader(name, value)\`: Set header
- \`setStatus(status)\`: Set status
- \`status?\`: Response status

### Error Handling
\`\`\`typescript
export async function GET(ctx: Context) {
    try {
        throw new Error('Something went wrong');
    } catch (err) {
        return {
            data: { error: err.message },
            config: { status: 500 }
        };
    }
}
\`\`\`

## Advanced Features

### Complex Routing

#### Catch-all Routes
\`\`\`typescript
// routes/docs/[...slug]/serve.ts
export async function GET(ctx: Context) {
    const slug = ctx.params.slug;  // string[]
    return { path: slug.join('/') };
}
\`\`\`

### Advanced Configuration
\`\`\`typescript
const app = new Kontas({
    port: 3000,
    routesDir: './api/routes',
    cors: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
    }
});
\`\`\`

### Advanced Middleware
Pattern matching di paths:
- \`/products\` = Exact match
- \`/orders/*\` = Single wildcard
- \`/api/**\` = Nested wildcard
- \`*/settings\` = Suffix match
- \`**/profile\` = Nested suffix match

\`\`\`typescript
const middlewares: MiddlewareGroup[] = [
    {
        middlewares: [auth, rateLimit],
        paths: ['/api/**', '*/settings']
    }
];
\`\`\`

### Advanced Error Handling

Kontas menyediakan class \`Code\` utk handle error dgn format yg konsisten & otomatis.

\`\`\`typescript
// routes/products/serve.ts
import { Code, type Context } from "kontas";

export async function GET(ctx: Context) {
    // Cara 1: Langsung code aja (default 500)
    throw new Code('SOMETHING_WRONG');
    
    // Cara 2: Status + code
    throw new Code(403, 'FORBIDDEN');
    
    // Cara 3: Status + code + data tambahan
    throw new Code(400, 'INVALID_INPUT', { field: 'email' });
    
    // ❌ Invalid status - TypeScript error
    throw new Code(199, 'INVALID');  // Error: 199 not assignable to type HttpStatus
}
\`\`\`

Error handler utk custom message:

\`\`\`typescript
// errorHandler.ts
import { Code } from "kontas";

export default function errorHandler(error: Code) {
    const { errorCode } = error;
    
    // success: false udh otomatis dari Code class
    switch(errorCode) {
        case 'NOT_FOUND':
            return {
                message: 'Data tidak ditemukan!',
                data: error.data // Optional
            };
            
        case 'INVALID_CREDENTIAL':
            return {
                message: 'Username atau password salah!'
            };
            
        case 'FORBIDDEN':
            return {
                message: 'Kamu gk punya akses!'
            };
            
        default:
            return {
                message: 'Ada kesalahan di server!'
            };
    }
}
\`\`\`

Features:
- Format error yg konsisten & otomatis
- Type-safe HTTP status codes (200, 201, 400, 401, etc)
- Custom error message per kode
- Auto set \`success: false\`
- Support data tambahan via \`error.data\`
- Type-safe dgn TypeScript
- Hot reload support

Response Format (otomatis):
\`\`\`json
{
    "success": false,
    "message": "Pesan error sesuai kode",
    "data": {} // Optional data tambahan
}
\`\`\`

Valid HTTP Status Codes:
- 200, 201 (Success)
- 400, 401, 403, 404, 405 (Client Error) 
- 500, 502, 503, 504 (Server Error)

## Security Features

### Rate Limiting

#### Basic Setup
\`\`\`typescript
const app = new Kontas({
    rateLimit: {
        windowMs: 15 * 60 * 1000,  // 15 menit
        max: 100  // max 100 requests per window
    }
});
\`\`\`

#### Advanced Config
\`\`\`typescript
const app = new Kontas({
    rateLimit: {
        windowMs: 60 * 1000,  // 1 menit
        max: 30,  // max 30 requests per minute
        message: 'Terlalu banyak request!',
        statusCode: 429,  // Too Many Requests
        skipFailedRequests: true,  // Skip non-2xx responses
        skipSuccessfulRequests: false,
        keyGenerator: (ctx) => {
            // Custom key (e.g., by API key)
            return ctx.request.headers.get('x-api-key') || 'anonymous';
        }
    }
});
\`\`\`

Rate Limit Info Headers:
- \`X-RateLimit-Limit\`: Max requests per window
- \`X-RateLimit-Remaining\`: Sisa requests
- \`X-RateLimit-Reset\`: Timestamp reset (ms)
- \`Retry-After\`: Seconds to wait (saat limit tercapai)

### Security Headers

#### Basic Setup
\`\`\`typescript
const app = new Kontas({
    securityHeaders: {
        xFrameOptions: 'DENY',  // Prevent clickjacking
        xContentTypeOptions: 'nosniff',  // Prevent MIME-type sniffing
        xXSSProtection: '1; mode=block',  // Enable XSS protection
        referrerPolicy: 'strict-origin-when-cross-origin'
    }
});
\`\`\`

#### Advanced Config
\`\`\`typescript
const app = new Kontas({
    securityHeaders: {
        // Prevent clickjacking
        xFrameOptions: 'DENY',
        
        // Prevent MIME-type sniffing
        xContentTypeOptions: 'nosniff',
        
        // Force HTTPS (HSTS)
        strictTransportSecurity: {
            maxAge: 31536000,  // 1 tahun
            includeSubDomains: true,
            preload: true
        },
        
        // XSS protection
        xXSSProtection: '1; mode=block',
        
        // Control referrer info
        referrerPolicy: 'strict-origin-when-cross-origin',
        
        // Content Security Policy
        contentSecurityPolicy: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:', 'https:'],
            'font-src': ["'self'"],
            'connect-src': ["'self'", 'https://api.example.com']
        },
        
        // Permissions Policy
        permissionsPolicy: {
            camera: ['none'],
            microphone: ['none'],
            geolocation: ['self'],
            'payment-features': ['self']
        }
    }
});
\`\`\`

Available Security Headers:
- \`X-Frame-Options\`: Mencegah clickjacking attacks
- \`X-Content-Type-Options\`: Mencegah MIME-type sniffing
- \`Strict-Transport-Security\`: Memaksa pake HTTPS
- \`X-XSS-Protection\`: Browser built-in XSS protection
- \`Referrer-Policy\`: Kontrol info referrer
- \`Content-Security-Policy\`: Kontrol resource loading
- \`Permissions-Policy\`: Kontrol fitur browser

### CSRF Protection

#### Basic Setup
\`\`\`typescript
const app = new Kontas({
    csrf: {
        enabled: true,
        secret: 'your-random-secret-key'  // WAJIB diganti!
    }
});
\`\`\`

#### Advanced Config
\`\`\`typescript
const app = new Kontas({
    csrf: {
        enabled: true,
        secret: 'your-random-secret-key',
        
        // Custom names
        cookieName: 'my-csrf-token',
        headerName: 'x-my-csrf-token',
        
        // Cookie settings
        cookieOptions: {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/',
            maxAge: 3600  // 1 jam
        },
        
        // Skip CSRF check untuk paths tertentu
        ignorePaths: [
            '/webhook',
            '/api/public/*'
        ],
        
        // Skip CSRF check untuk methods tertentu
        ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
    }
});
\`\`\`

#### Client Side Setup

Dengan Fetch:
\`\`\`typescript
// CSRF token otomatis ada di cookie
fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': 'token-from-cookie'  // WAJIB sama dengan cookie
    },
    body: JSON.stringify(data)
});
\`\`\`

Dengan Axios:
\`\`\`typescript
// Axios bisa auto handle CSRF
axios.defaults.withCredentials = true;  // Enable cookies
\`\`\`

CSRF Features:
- Double submit cookie pattern
- Zero server-side storage
- Auto-refresh token per request
- Configurable per path/method
- Secure defaults (httpOnly, secure, etc)

### Input Sanitization

#### Basic Setup
\`\`\`typescript
const app = new Kontas({
    sanitizer: {
        enabled: true,
        rules: {
            removeXSS: true,
            stripTags: true,
            escapeHTML: true
        }
    }
});
\`\`\`

#### Advanced Config
\`\`\`typescript
const app = new Kontas({
    sanitizer: {
        enabled: true,
        rules: {
            // Basic security
            removeXSS: true,      // <script>alert(1)</script> -> alert(1)
            stripTags: true,      // <p>text</p> -> text
            escapeHTML: true,     // <>&'" -> &lt;&gt;&amp;&#39;&quot;
            
            // Content cleaning
            trimSpaces: true,     // "  text  " -> "text"
            removeEmoji: true,    // "hello 👋" -> "hello "
            maxLength: 1000,      // Truncate panjang string
            
            // Allow specific HTML
            allowedTags: ['b', 'i', 'em', 'strong'],
            allowedAttributes: {
                'a': ['href', 'title'],
                'img': ['src', 'alt']
            },
            
            // Custom rules
            customRules: [
                {
                    pattern: /badword/gi,
                    replace: '****'
                }
            ]
        },
        
        // Skip sanitize untuk paths tertentu
        ignorePaths: [
            '/admin/*',
            '/api/trusted/*'
        ],
        
        // Atau sanitize HANYA paths tertentu
        onlyPaths: [
            '/api/comments/*',
            '/api/posts/*'
        ]
    }
});
\`\`\`

Input Sanitization Features:
- Auto sanitize request body
- XSS & injection protection
- Path-based rules
- Custom sanitization rules
- Support JSON & form data
- Recursive object sanitization

Example Input & Output:
\`\`\`typescript
// Input dari client
const input = {
    title: '<script>alert("xss")</script>Hello!',
    desc: '  <b>Some text</b> with emoji 👋  ',
    html: '<p onclick="evil()">Click me</p>',
    comment: 'Contains badword here'
};

// Output setelah sanitize
const output = {
    title: 'Hello!',  // script removed
    desc: 'Some text with emoji',  // tags stripped & emoji removed
    html: '<p>Click me</p>',  // onclick removed
    comment: 'Contains **** here'  // custom rule applied
};
\`\`\`

## Development Features

### Hot Reload
\`\`\`typescript
const app = new Kontas({
    dev: {
        hotReload: true,
        watchDirs: ['routes', 'middleware']
    }
});
\`\`\`

### Port Management
\`\`\`typescript
const app = new Kontas({
    port: 3000,
    portFallback: true  // Auto switch if port is taken
});
\`\`\`

### Route Summary
\`\`\`typescript
const app = new Kontas({
    dev: {
        showRoutes: true  // Display all registered routes
    }
});
\`\`\`

## Example Implementations

### Dynamic Route + Query
\`\`\`typescript
// routes/users/[id]/posts/[postId]/serve.ts
export async function GET(ctx: Context) {
    // URL: /users/123/posts/456?sort=desc
    const { id, postId } = ctx.params;
    const sort = ctx.query.get('sort');
    
    return { userId: id, postId, sort };
}
\`\`\`

### Catch-all Route
\`\`\`typescript
// routes/docs/[...slug]/serve.ts
export async function GET(ctx: Context) {
    // URL: /docs/api/v1/users
    const slug = ctx.params.slug; // ['api', 'v1', 'users']
    return { path: slug.join('/') };
}
\`\`\`

### File Upload
\`\`\`typescript
export async function POST(ctx: Context) {
    const form = await ctx.request.formData();
    const file = form.get('file') as File;
    await Bun.write('./uploads/' + file.name, file);
    return { filename: file.name };
}
\`\`\`

### Error Handling
\`\`\`typescript
export async function GET(ctx: Context) {
    try {
        throw new Error('Something went wrong');
    } catch (err) {
        return {
            data: { error: err.message },
            config: { status: 500 }
        };
    }
}
\`\`\`

## Coming Soon
- File Upload Validation
- Database Integration
- WebSocket Support
- Advanced Caching
- GraphQL Support

## 🔥 Development Features
- Hot Reload: Auto-reload routes & middleware saat ada perubahan
- Port Management: Auto-detect & switch ke port available
- Route Summary: Display registered routes & methods
- Error Handling: Detailed error messages & validations

## Need Help?
Jika Anda memiliki pertanyaan atau masalah:
- Buat issue di repository GitHub kami
- Bergabung dengan komunitas Discord kami
- Kunjungi dokumentasi online kami
- Hubungi tim support kami

`

export const KONTAS_DOCS_PROMPT = `
Kamu adalah AI assistant untuk KONTAS framework. Gunakan dokumentasi berikut untuk menjawab pertanyaan user:

${docs}

RULES:
- Jawab pertanyaan berdasarkan dokumentasi di atas
- Jika ada yg ditanyakan tapi gk ada di docs, bilang aja blm ada di docs
- Jawaban harus dalam bahasa Indonesia sehari-hari
- Jangan lupa pakai emoji yg sesuai konteks
- Kalau ada code, kasih contoh code yg sesuai dgn docs
`