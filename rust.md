# Next.js - Rust - WebAssembly

## Setup

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        }
        return config
    }
};

export default nextConfig;
```

# Rust - WebAssembly

```bash
bun add -d wasm-pack
```

## Setup

```bash
cargo new rust-lib --lib
```

# Build Rust

```bash
bunx wasm-pack build --target web
```